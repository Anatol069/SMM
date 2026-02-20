const express = require('express');
const { getPosts, createPost, updatePost, deletePost } = require('../controllers/postController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All post routes require authentication
router.use(authMiddleware);

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
