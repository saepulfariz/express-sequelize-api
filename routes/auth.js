const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/token', authController.token);
router.post('/logout', authController.logout);

module.exports = router;