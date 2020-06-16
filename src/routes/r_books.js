/**
 * ExpressJs FW
 */
// import express framework
const express = require('express');
// instance of express router
const router = express.Router();

// import multer upload helper
const upload = require('../helpers/upload');

// import middlewares
const auth_middlewares = require('../middlewares/mdl_auth');

/**
 * Controllers
 */
// load the controller
const books_controller = require('../controllers/c_books');

// Get All Books
router.get('/', auth_middlewares.level_user, books_controller.get_books);
// Post a Book
router.post('/add', auth_middlewares.level_staff, upload.single('book_image'), books_controller.post_book);
// Return a Book
router.patch('/return/:id', auth_middlewares.level_user, upload.single('book_image'), books_controller.return_book);
// Borrow a Book
router.patch('/borrow/:id', auth_middlewares.level_user, upload.single('book_image'), books_controller.borrow_book);
// Patch a Book
router.patch('/update/:id', auth_middlewares.level_staff, upload.single('book_image'), books_controller.patch_book);
// Delete a Book
router.delete('/delete/:id', auth_middlewares.level_admin, books_controller.delete_book);

module.exports = router;