import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  const { items, totalPrice } = req.body;
  const order = await Order.create({ user: req.user._id, items, totalPrice });
  res.status(201).json(order);
};

export const getOrdersByUser = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("items.product");
  res.json(orders);
};
