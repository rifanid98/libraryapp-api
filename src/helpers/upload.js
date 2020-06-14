
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
const file_filter = function (req, file, cb) {
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
    fileFilter: file_filter,
});

module.exports = upload;