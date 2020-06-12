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
const auth_controller = require('../controllers/c_auth');

// register user
router.post('/register', upload.none(), auth_controller.register);
router.post('/login', upload.none(), auth_controller.login);

module.exports = router;