const express = require('express');
const router = express.Router();

const {
  createNewUser,
  authorizationUser,
  deleteRefreshToken
} = require('../controllers/user.controller');
const { authenticateToken } = require('../middleware/authenticateToken.middleware');

router.post('/createNewUser', createNewUser);
router.post('/authorizationUser', authorizationUser);
router.delete('/deleteRefreshToken', authenticateToken, deleteRefreshToken);

module.exports = router;