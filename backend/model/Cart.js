const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
  totalPrice: { type: Number, default: 0 },
  currency: { type: String, default: 'USD' }
});

module.exports = mongoose.model('Cart', cartSchema);
