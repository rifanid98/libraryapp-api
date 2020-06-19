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
const auth_middleware = require('../middlewares/mdl_auth');

/**
 * Controllers
 */
// load the controller
const books_controller = require('../controllers/c_books');

// Get All Books
router.get('/', auth_middleware.check_role([3, 2, 1]), books_controller.get_books);
// Post a Book
router.post('/add', auth_middleware.check_role([2, 1]), upload.single('book_image'), books_controller.post_book);
// Return a Book
router.patch('/return/:id', auth_middleware.check_role([3, 2, 1]), upload.single('book_image'), books_controller.return_book);
// Borrow a Book
router.patch('/borrow/:id', auth_middleware.check_role([3, 2, 1]), upload.single('book_image'), books_controller.borrow_book);
// Patch a Book
router.patch('/update/:id', auth_middleware.check_role([2, 1]), upload.single('book_image'), books_controller.patch_book);
// Delete a Book
router.delete('/delete/:id', auth_middleware.check_role([1]), books_controller.delete_book);

// // Get All Books
// router.get('/', auth_middleware.check_role([3, 2, 1]), books_controller.get_books);
// // Post a Book
// router.post('/', auth_middleware.check_role([2, 1]), upload.single('book_image'), books_controller.post_book);
// // Patch a Book
// router.patch('/:id', auth_middleware.check_role([2, 1]), upload.single('book_image'), books_controller.patch_book);
// // Delete a Book
// router.delete('/:id', auth_middleware.check_role([1]), books_controller.delete_book);

// // Return a Book
// router.patch('/:id/return', auth_middleware.check_role([3, 2, 1]), upload.single('book_image'), books_controller.return_book);
// // Borrow a Book
// router.patch('/:id/borrow', auth_middleware.check_role([3, 2, 1]), upload.single('book_image'), books_controller.borrow_book);

module.exports = router;