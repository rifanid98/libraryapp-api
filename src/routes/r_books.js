/**
 * ExpressJs FW
 */
// import express framework
const express = require('express');
// instance of express router
const router = express.Router();

// import multer upload helper
const upload = require('../helpers/upload');

// import middleware
const auth_middleware = require('../middleware/mdl_auth');

/**
 * Controllers
 */
// load the controller
const books_controller = require('../controllers/c_books');

// Get All Books
router.get('/', auth_middleware.level_user, books_controller.get_books);
// Post a Book
router.post('/', auth_middleware.level_staff, upload.single('book_image'), books_controller.post_book);
// Patch a Book
router.patch('/:id', auth_middleware.level_staff, upload.single('book_image'), books_controller.patch_book);
// Delete a Book
router.delete('/:id', auth_middleware.level_admin, books_controller.delete_book);

module.exports = router;