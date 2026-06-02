const Order = require("../models/order");

const createOrder = async (req, res) => {

  try {

    const order = await Order.create({
      user: req.user.id,
      products: req.body.products,
      totalPrice: req.body.totalPrice
    });

    res.status(201).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

const getOrders = async (req, res) => {

  try {

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product");

    res.status(200).json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  createOrder,
  getOrders
};