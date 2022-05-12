const express = require('express');
const router = express.Router();

const {
  createNewUser,
  authorizationUser,
  deleteRefreshToken
} = require('../controllers/user.controller');

router.post('/createNewUser', createNewUser);
router.post('/authorizationUser', authorizationUser);
router.delete('/deleteRefreshToken', deleteRefreshToken);

module.exports = router;