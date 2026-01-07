const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/checkout', authMiddleware, ordersController.checkout);

module.exports = router;
