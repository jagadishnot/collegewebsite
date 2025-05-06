const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Product = require('../models/Product');
const router = express.Router();

// Add product (admin protected route)
router.post('/add-product', authMiddleware, async (req, res) => {
  const { name, description, price, image } = req.body;
  
  try {
    const newProduct = new Product({ name, description, price, image });
    await newProduct.save();
    res.status(200).json({ msg: 'Product added successfully!' });
  } catch (err) {
    res.status(500).json({ msg: 'Error adding product', error: err.message });
  }
});

module.exports = router;
