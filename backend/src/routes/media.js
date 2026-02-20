const express = require('express');
const { getMedia, createMedia, deleteMedia } = require('../controllers/mediaController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All media routes require authentication
router.use(authMiddleware);

router.get('/', getMedia);
router.post('/', createMedia);
router.delete('/:id', deleteMedia);

module.exports = router;
