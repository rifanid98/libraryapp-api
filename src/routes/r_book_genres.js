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
const book_genres_controller = require('../controllers/c_book_genres');

// Get All Books
router.get('/', auth_middlewares.level_user, book_genres_controller.get_book_genres);
// Post a Book
router.post('/', auth_middlewares.level_staff, upload.none(), book_genres_controller.post_book_genre);
// Patch a Book
router.patch('/:id', auth_middlewares.level_staff, upload.none(), book_genres_controller.patch_book_genre);
// Delete a Book
router.delete('/:id', auth_middlewares.level_admin, book_genres_controller.delete_book_genre);


module.exports = router;