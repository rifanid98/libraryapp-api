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
const book_genres_controller = require('../controllers/c_book_genres');

// Get All Books
router.get('/', auth_middleware.check_role([3, 2, 1]), book_genres_controller.get_book_genres);
// Post a Book
router.post('/', auth_middleware.check_role([2, 1]), upload.none(), book_genres_controller.post_book_genre);
// Patch a Book
router.patch('/:id', auth_middleware.check_role([2, 1]), upload.none(), book_genres_controller.patch_book_genre);
// Delete a Book
router.delete('/:id', auth_middleware.check_role([1]), book_genres_controller.delete_book_genre);


module.exports = router;