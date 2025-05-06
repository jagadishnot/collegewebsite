const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');

// Get Products
router.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Place Order
router.post('/order', async (req, res) => {
  const { userId, products, totalAmount } = req.body;

  try {
    const order = new Order({ userId, products, totalAmount });
    await order.save();
    res.status(200).json({ msg: 'Order placed successfully!' });
  } catch (err) {
    res.status(500).json({ msg: 'Error placing order', error: err.message });
  }
});

// (Optional) Add New Product
router.post('/add-product', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(200).json({ msg: 'Product added!' });
});

module.exports = router;
