const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const verifyToken = require('../middleware/verifyToken');

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/signout', verifyToken, authController.signout);
router.delete('/delete-account', verifyToken, authController.deleteAccount);
router.post('/send-reset-link', authController.sendResetLink);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
