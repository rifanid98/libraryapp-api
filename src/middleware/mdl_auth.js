const jwt = require('jsonwebtoken');
const config = require('../configs/global');
const myResponse = require('../helpers/myResponse');

module.exports = {
    verifyJwtToken: function(req, res, next) {
        const token = req.headers.authorization;
        try {
            const decoded = jwt.verify(token, config.jwtSecretKey);
            req.decodedToken = decoded;
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                const message = {
                    error: error.message,
                    message: 'Please refresh token'
                }
                return myResponse.response(res, "failed", message, 401, "Invalid Token!")
            }
        }
    }
}