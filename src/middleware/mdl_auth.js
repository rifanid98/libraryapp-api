const jwt = require('jsonwebtoken');
const { required } = require('joi');
const config = require('../configs/global');
const myResponse = require('../helpers/myResponse');
const { response } = require('../helpers/myResponse');

module.exports = {
    verifyJwtToken: function(req, res, next) {
        const token = req.headers.authorization;
        try {
            const decoded = jwt.verify(token, config.jwtSecretKey);
            req.decodedToken = decoded;
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return myResponse.response(res, "failed", error.message, 401, "Invalid Token!")
            }
        }
    }
}