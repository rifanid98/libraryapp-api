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
            switch (error.name) {
                case 'TokenExpiredError':
                    var message = {
                        error: error.message,
                        message: 'Please refresh token'
                    }
                    return myResponse.response(res, "failed", "", 500, message);
                    break;
                case 'JsonWebTokenError':
                    var message = {
                        error: error.message,
                        message: 'Please login'
                    }
                    return myResponse.response(res, "failed", "", 500, message);
                    break;
            
                default:
                    console.log(error);
                    return myResponse.response(res, "failed", "", 500, "Internal Server Error!")
                    break;
            }
        }
    }
}