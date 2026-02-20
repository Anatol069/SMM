const express = require('express');
const {
  getAccounts,
  createAccount,
  deleteAccount,
} = require('../controllers/socialAccountController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All social account routes require authentication
router.use(authMiddleware);

router.get('/', getAccounts);
router.post('/', createAccount);
router.delete('/:id', deleteAccount);

module.exports = router;
