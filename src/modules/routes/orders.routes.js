const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../services/service');

const {
  getAllDoctors,
  getAllUserOrders,
  addNewOrder,
  updateUserOrder,
  deleteUsersOrder
} = require('../controllers/orders.controllers');

router.get('/getAllDoctors', getAllDoctors);
router.get('/getAllUserOrders', authenticateToken, getAllUserOrders);
router.post('/addNewOrder', authenticateToken, addNewOrder);
router.patch('/updateUserOrder', authenticateToken, updateUserOrder);
router.delete('/deleteUsersOrder', authenticateToken, deleteUsersOrder);

module.exports = router;