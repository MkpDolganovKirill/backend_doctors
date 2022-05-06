const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authenticateToken.middleware');

const {
  createNewDoctor,
  getAllUserOrders,
  addNewOrder,
  updateUserOrder,
  deleteUsersOrder
} = require('../controllers/orders.controllers');

router.post('/createNewDoctor', createNewDoctor);
router.get('/getAllUserOrders', authenticateToken, getAllUserOrders);
router.post('/addNewOrder', authenticateToken, addNewOrder);
router.patch('/updateUserOrder', authenticateToken, updateUserOrder);
router.delete('/deleteUsersOrder', authenticateToken, deleteUsersOrder);

module.exports = router;