const express = require('express');
const { createUser, loginUser, getAllUser, updateUser, deleteUser, updateUserRole } = require('../controllers/UserController');
const { userValidation } = require('../utils/userValidtion');
const { isAuthenticatedUser, authorizeRoles} = require('../middleware/auth'); 

const router = express.Router();

router.post('/new', userValidation, createUser);
router.post('/login', loginUser);
router.post('/update', isAuthenticatedUser, updateUser);

router.get('/all', isAuthenticatedUser, authorizeRoles('admin'), getAllUser);
router.delete('/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteUser);
router.put('/:id', isAuthenticatedUser, authorizeRoles('admin'), updateUserRole);

module.exports = router;