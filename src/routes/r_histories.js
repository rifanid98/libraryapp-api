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
const authMiddleware = require('../middlewares/mdl_auth');

/**
 * Controllers
 */
// load the controller
const historiesController = require('../controllers/c_histories');

// Get All Histories
router.get('/', authMiddleware.checkRole([3, 2, 1]), historiesController.getHistories);
// Get Detail History
router.get('/:id', authMiddleware.checkRole([3, 2, 1]), historiesController.getHistoryById);
// Get Pending History
router.get('/:bookId/:userId', authMiddleware.checkRole([3, 2, 1]), historiesController.getPendingHistory);
// Post a history
router.post('/', authMiddleware.checkRole([2, 1]), upload.none(), historiesController.postHistory);
// Patch a history
router.patch('/:id', authMiddleware.checkRole([2, 1]), upload.none(), historiesController.patchHistory);
// Delete a history
router.delete('/:id', authMiddleware.checkRole([1]), historiesController.deleteHistory);


module.exports = router;