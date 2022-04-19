const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../services/service');

const {
  getAllUserOrders
} = require('../controllers/orders.controllers');

router.get('/getAllUserOrders', authenticateToken, getAllUserOrders);

module.exports = router;