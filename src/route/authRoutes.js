const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

// Auth routes
router.post('/signup', verifyToken, checkRole(['backoffice']), authController.signup);
router.post('/signin', authController.signin);
router.post('/signout', authController.signout);
router.delete('/delete-user/:id', verifyToken, checkRole(['backoffice']), authController.deleteAccountById);
router.put('/update-user/:id', verifyToken, checkRole(['backoffice']), authController.updateUserById);
router.get('/users', verifyToken, checkRole(['backoffice']), authController.getBackofficeUsers);
router.get('/user/:id', verifyToken, checkRole(['backoffice']), authController.getUserById);
router.post('/send-reset-link', authController.sendResetLink);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
