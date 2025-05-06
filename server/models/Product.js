const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String, // URL or base64
});

module.exports = mongoose.model('Product', productSchema);
