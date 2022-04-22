const express = require('express');
const router = express.Router();

const {
  createNewUser,
  authorizationUser
} = require('../controllers/user.controller');

router.post('/createNewUser', createNewUser);
router.post('/authorizationUser', authorizationUser);

module.exports = router;