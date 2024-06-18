const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const verifyToken = require('../middleware/verifyToken');

router.post('/signup', verifyToken, authController.signup);
router.post('/signin', authController.signin);
router.post('/signout', verifyToken, authController.signout);
router.delete('/delete-account', verifyToken, authController.deleteAccount);
router.post('/send-reset-link', authController.sendResetLink);
router.post('/reset-password', authController.resetPassword);
router.get('/backoffice-users', verifyToken, authController.getBackofficeUsers);
router.get('/backoffice-user/:id', verifyToken, authController.getUserById);

module.exports = router;
