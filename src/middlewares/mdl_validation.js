const { query } = require('express');

// import xss escape characters
require('../helpers/xss_escape');

module.exports = {
    xss_escape: function(req, res, next) {
        for (key in req.query) {
            req.query[key] = req.query[key].escape();
        }
        for (key in req.body) {
            req.body[key] = req.body[key].escape();
        }
        for (key in req.params) {
            req.params[key] = req.params[key].escape();
        }
        next();
    }
}