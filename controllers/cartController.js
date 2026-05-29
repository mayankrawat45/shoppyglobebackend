const Cart = require("../models/Cart");
const Product = require("../models/Product");


const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const cartItem = await Cart.create({
      user: req.user._id,
      product: productId,
      quantity,
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    item.quantity = req.body.quantity;

    await item.save();

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const deleteCart = async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    await item.deleteOne();

    res.status(200).json({
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports= {addToCart,deleteCart,updateCart}