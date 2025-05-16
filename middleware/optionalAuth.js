const jwt = require('jsonwebtoken');
const models = require('../models');

module.exports = optionalAuthentication = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await models.User.findByPk(decoded.id);
            if (user) {
                req.user = user.dataValues;
            }
        } catch (err) {
            req.user = null;
        }
    } else {
        req.user = null;
    }
    next();
};
