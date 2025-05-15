const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const models = require('../models');
const REST = require("../utils/REST");

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await models.User.scope('withPassword').findOne({ where: { username: username } });
        if (!user) return REST.error(res, 'Invalid credentials', 401);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return REST.error(res, 'Invalid credentials', 401);

        const payload = { id: user.id, username: user.username };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '120m' });

        await models.AccessToken.create({
            user_id: user.id,
            token,
            expired_at: new Date(Date.now() + 120 * 60 * 1000) // 120 minutes
        });

        return REST.success(res, {
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
            },
            token: token,
        }, 'Login success');
    } catch (err) {
        return REST.error(res, err.message, 500);
    }
};

exports.logout = async (req, res) => {
    try {
        await models.AccessToken.destroy({
            where: { token: req.token }
        });
        return REST.success(res, null, 'Logged out success');
    } catch (err) {
        return REST.error(res, "Logged out failed!", 500);
    }
};

