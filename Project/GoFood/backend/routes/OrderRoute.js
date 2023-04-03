const express = require('express');
const { makeOrder, orders, getAllOrders } = require('../controllers/OrderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.post('/new', makeOrder);
router.post('/orders', orders);
router.get('/:email', isAuthenticatedUser, authorizeRoles('admin'), getAllOrders);

module.exports = router;