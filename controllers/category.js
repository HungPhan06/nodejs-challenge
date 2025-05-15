const models = require('../models');
const REST = require("../utils/REST");
const cacheService = require('../services/cache');

exports.getAllCategories = async (req, res) => {
    try {
        const cacheKey = "categories:all";
        let data = cacheService.get(cacheKey);
        if (!data) {
            const categories = await models.Category.findAndCountAll({
                attributes: [
                    "id",
                    "name",
                    "createdAt",
                ],
                order: [['createdAt', 'DESC']],
                raw: true
            });
            data = {
                rows: categories.rows,
                total: categories.count
            };
            cacheService.set(cacheKey, data);
        }
        return REST.success(res, data, 'Get categories success.');
    } catch (error) {
        return REST.error(res, error.message, 500);
    }
};
