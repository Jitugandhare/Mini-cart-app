const express = require('express');
const { addToCart, viewCart, checkout } = require('../controller/cartController.js');
const router = express.Router();

router.post('/add', addToCart);
router.get('/view', viewCart);
router.post('/checkout', checkout);

module.exports = router;
