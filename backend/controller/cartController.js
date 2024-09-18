const Cart = require('../model/Cart.js');
const Product = require('../model/Product.js');

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findOne({ productId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne();

    if (!cart) {
      cart = new Cart();
    }

    const existingItem = cart.items.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId: product.productId,
        name: product.name,
        price: product.price,
        quantity
      });
    }

    cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error adding to cart', error: err.message });
  }
};

// View cart
exports.viewCart = async (req, res) => {
  try {
    const cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ message: 'Cart is empty' });
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error viewing cart', error: err.message });
  }
};

// Checkout and apply discounts
exports.checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne();
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Apply discounts (example logic)
    cart.items.forEach(item => {
      if (item.category === 'Fashion' && item.quantity >= 2) {
        item.quantity = Math.ceil(item.quantity / 2); // Buy 1 Get 1 Free
      } else if (item.category === 'Electronics') {
        item.price *= 0.9; // 10% Off
      }
    });

    cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    await cart.save();
    res.status(200).json({ message: 'Checkout successful', cart });
  } catch (err) {
    res.status(500).json({ message: 'Error during checkout', error: err.message });
  }
};
