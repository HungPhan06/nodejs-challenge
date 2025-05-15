const models = require('../models');
const REST = require("../utils/REST");
const cacheService = require('../services/cache');

exports.getAllSubcategories = async (req, res) => {
    try {
        const category_id = req.query.category_id ?? null;
        const cacheKey = `subcategories:${category_id ? 'category_id_' + category_id : 'all'}`;
        let data = cacheService.get(cacheKey);
        if (!data) {
            const subcategories = await models.Subcategory.findAndCountAll({
                attributes: [
                    "id",
                    "name",
                    "createdAt",
                ],
                include: [
                    {
                        model: models.Category,
                        as: "category",
                        attributes: ['id', 'name']
                    }
                ],
                ...(category_id !== null && {
                    where: { category_id: category_id }
                }),
                order: [['createdAt', 'DESC']]
            });
            data = {
                rows: subcategories.rows.map(item => item.toJSON()),
                total: subcategories.count
            };
            cacheService.set(cacheKey, data);
        }
        return REST.success(res, data, 'Get subcategories success.');
    } catch (error) {
        return REST.error(res, error.message, 500);
    }
};
