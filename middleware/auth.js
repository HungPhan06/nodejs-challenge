const jwt = require('jsonwebtoken');
const models = require('../models');
const REST = require("../utils/REST");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return REST.error(res, 'Missing token', 401);

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const tokenInDb = await models.AccessToken.findOne({ where: { token: token } });
    if (!tokenInDb) return REST.error(res, 'Invalid token', 401);

    const now = new Date();
    if (tokenInDb.expired_at <= now) {
      tokenInDb.destroy();
      return REST.error(res, 'Token expired', 401);
    }
    req.token = token;
    req.user = decoded;
    next();
  } catch (err) {
    return REST.error(res, 'Unauthorized', 401);
  }
};
