const express = require('express');
const router = express.Router();

const {
  getAllUserOrders
} = require('../controllers/orders.controllers');

router.get('/getAllUserOrders', getAllUserOrders);

module.exports = router;