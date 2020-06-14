const jwt = require('jsonwebtoken');
const config = require('../configs/global');
const my_response = require('../helpers/my_response');

module.exports = {
    verify_jwt_token: function(req, res, next) {
        const token = req.headers.authorization;
        try {
            const decoded = jwt.verify(token, config.jwt_secret_key);
            if (decoded.tokenType == 'login') {
                req.decoded_token = decoded;
                next();
            } else {
                const message = {
                    error: 'Wrong token',
                    message: 'Please use login token'
                }
                return my_response.response(res, "failed", "", 500, message);
            }
        } catch (error) {
            switch (error.name) {
                case 'TokenExpiredError':
                    var message = {
                        error: error.message,
                        message: 'Please refresh token'
                    }
                    return my_response.response(res, "failed", "", 500, message);
                    break;
                    
                case 'JsonWebTokenError':
                    var message = {
                        error: error.message,
                        message: 'Please login'
                    }
                    return my_response.response(res, "failed", "", 500, message);
                    break;
            
                default:
                    console.log(error);
                    return my_response.response(res, "failed", "", 500, "Internal Server Error!")
                    break;
            }
        }
    },
    level_admin: function(req, res, next) {
        try {
            const user_role = req.decoded_token.user_role;
            if (user_role == 1) {
                next();
            } else {
                const message = `Invalid user`;
                return my_response.response(res, "failed", "", 500, message)
            }
        } catch (error) {
            console.log(error);
            const message = `Internal Server Error`;
            return my_response.response(res, "failed", "", 500, message)
        }
    },
    level_staff: function(req, res, next) {
        try {
            const user_role = req.decoded_token.user_role;
            if (user_role == 2 || user_role == 1) {
                next();
            } else {
                const message = `Invalid user`;
                return my_response.response(res, "failed", "", 500, message)
            }
        } catch (error) {
            console.log(error);
            const message = `Internal Server Error`;
            return my_response.response(res, "failed", "", 500, message)
        }
    },
    level_user: function(req, res, next) {
        try {
            const user_role = req.decoded_token.user_role;
            if (user_role == 3 || user_role == 2 || user_role == 1) {
                next();
            } else {
                const message = `Invalid user`;
                return my_response.response(res, "failed", "", 500, message)
            }   
        } catch (error) {
            console.log(error);
            const message = `Internal Server Error`;
            return my_response.response(res, "failed", "", 500, message)
        }
    }
}