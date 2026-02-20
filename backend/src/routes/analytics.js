const express = require('express');
const { getAnalytics } = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All analytics routes require authentication
router.use(authMiddleware);

router.get('/', getAnalytics);

module.exports = router;
