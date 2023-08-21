const jwt = require('jsonwebtoken');
const { verifyToken } = require('../helpers/session.helper')

module.exports = {
    auth: async (req, res, next) => {
        try {
            const token = req.get('authorization');
            if (!token) {
                throw new Error('Token is required');
            }

            const user = verifyToken(token)

            req.user = user;
            await next();
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
