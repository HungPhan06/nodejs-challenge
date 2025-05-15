const { make } = require('simple-body-validator');
const { Op } = require("sequelize")
const cacheService = require('../services/cache');
const models = require('../models');
const REST = require("../utils/REST");

exports.getAllProducts = async (req, res) => {
    try {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;

        const cacheKey = `products:page=${page}&limit=${limit}`;
        let data = cacheService.get(cacheKey);
        if (!data) {
            const result = await fetchProducts({ page, limit });
            if (!result.success) {
                return REST.error(res, result.error.message, 500);
            }
            data = result.data;
            cacheService.set(cacheKey, data)
        }
        return REST.success(res, data, 'Get products success.');
    } catch (error) {
        return REST.error(res, error.message, 500);
    }
};

exports.searchProducts = async (req, res) => {
    try {
        const q = req.query.q || '';
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;

        const result = await fetchProducts({ query: q, page, limit });
        if (result.success) {
            return REST.success(res, result.data, 'Get products success.');
        }
        return REST.error(res, result.error.message, 500);
    } catch (error) {
        return REST.error(res, error.message, 500);
    }
};

exports.createProduct = async (req, res) => {
    try {
        const rules = {
            name: 'required|string',
            price: 'required|numeric',
            category_id: 'required|numeric',
            subcategory_id: 'required|numeric'
        };

        const validator = make(req.body, rules);
        if (!validator.validate()) {
            return REST.error(res, validator.errors().all(), 422);
        }
        const { name, price, category_id, subcategory_id } = req.body;
        const category = await models.Category.findOne({ where: { id: category_id } });
        if (!category) {
            return REST.error(res, "Category invalid!", 422);
        }
        const subcategory = await models.Subcategory.findOne({ where: { id: subcategory_id } });
        if (!subcategory) {
            return REST.error(res, "Subcategory invalid!", 422);
        }

        if (subcategory.category_id != category.id) {
            return REST.error(res, "Subcategory invalid!", 422);
        }
        const product = await models.Product.create({
            name: name,
            price: price,
            category_id: category_id,
            subcategory_id: subcategory_id
        });

        cacheService.deleteCacheByPrefix("products:"); // Invalidate cache
        return REST.success(res, product, "Create product success.");
    } catch (error) {
        return REST.error(res, error.message, 500);
    }
};

exports.likeProduct = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.id;

        const product = await models.Product.findOne({ where: { id: productId } });
        if (!product) {
            return REST.error(res, "Product invalid!", 422);
        }
        const favorite = await models.Favorite.findOne({ where: { user_id: userId, product_id: productId } });
        let message = "Like";
        if (favorite) {
            message = "Unlike";
            await favorite.destroy();
        } else {
            await models.Favorite.create({ user_id: userId, product_id: productId });
        }

        cacheService.deleteCacheByPrefix("products:");
        return REST.success(res, null, message + " Success");
    } catch (error) {
        return REST.error(res, error.message, 500);
    }
};

const fetchProducts = async ({ query = '', page = 1, limit = 10 }) => {
    try {
        const offset = (page - 1) * limit;
        const where = {};

        if (query) {
            where.name = {
                [Op.like]: `%${query}%`
            };
        }

        const products = await models.Product.findAndCountAll({
            where,
            attributes: [
                "id",
                "name",
                "price",
                "createdAt",
                [
                    models.sequelize.literal("(SELECT COUNT(favorites.id) FROM favorites WHERE favorites.product_id = Product.id)"),
                    'favorite_count'
                ]
            ],
            include: [
                {
                    model: models.Category,
                    as: "category",
                    attributes: ['id', 'name']
                },
                {
                    model: models.Subcategory,
                    as: "subcategory",
                    attributes: ['id', 'name']
                },
            ],
            order: [['createdAt', 'DESC']],
            limit,
            offset,
        });

        return {
            data: {
                rows: products.rows.map(item => item.toJSON()),
                total: products.count,
                page,
                totalPages: Math.ceil(products.count / limit),
            },
            success: true
        }
    } catch (error) {
        return {
            success: false,
            error: error
        }
    }
};
