const express = require('express');
const { getAllFood, newFood, deleteFood, createCategory } = require('../controllers/FoodController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllFood);
router.post('/new', isAuthenticatedUser, authorizeRoles('admin'), newFood);
router.delete('/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteFood);

//Category route
router.post("/category/new", isAuthenticatedUser, authorizeRoles('admin'), createCategory);

module.exports = router;