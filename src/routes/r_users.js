/**
 * ExpressJs FW
 */
// import express framework
const express = require('express');
// instance of express router
const router = express.Router();

// import multer upload helper
const upload = require('../helpers/upload');

/**
 * Controllers
 */
// load the controller
const users_controller = require('../controllers/c_users');

// register user
router.get('/', users_controller.get_users);

module.exports = router;