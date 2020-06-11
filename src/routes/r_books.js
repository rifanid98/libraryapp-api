/**
 * ExpressJs FW
 */
// import express framework
const express = require('express');
// instance of express router
const router = express.Router();

/**
 * Controllers
 */
// load the controller
const books_controller = require('../controllers/c_books');

/**
 * Multer File Handling
 */
// import multer
const multer = require('multer');
// import path
const path = require('path');
// set storage
const storage = multer.diskStorage({
    destination: path.join('src/assets/images/'),
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});
// set file filter
const fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // reject files
        cb(null, false);
    }
};
// set upload multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 20
    },
    fileFilter: fileFilter,
});

// Get All Books
router.get('/', books_controller.get_books);
// Post a Book
router.post('/', upload.single('book_image'), books_controller.post_book);
// Patch a Book
router.patch('/:id', upload.single('book_image'), books_controller.patch_book);
// Delete a Book
router.delete('/:id', books_controller.delete_book);

module.exports = router;