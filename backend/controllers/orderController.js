import Order from "../models/orderModel.js";
const addOrderItems = async (req, res) => {
  // createOrder(
  //     {
  //       orderItems: cart.items,
  //       shippingAddress: cart.shippingAddress,
  //       paymentMethod: cart.paymentMethod,
  //       itemsPrice: cart2.itemsPrice,
  //       shippingPrice: cart2.shippingPrice,
  //       taxPrice: cart2.taxPrice,
  //       totalPrice: cart2.totalPrice,
  //     },
  //     user.token
  //   )
  console.log(req.body);
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  //   comsole.log(req.body);

  if (orderItems && orderItems.length === 0) {
    const error = new Error("No order items");
    error.status = 404;
    error.body = "No order items";
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(201).json(order);
    return;
  }
  const error = new Error("Order Not Found");
  error.status = 404;
  error.body = "Order Not Found";
  res.status(404).json({
    status: "fail",
    message: error,
  });
};

const updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    const updatedOrder = await order.save();
    res.status(201).json(updatedOrder);
  } else {
    const error = new Error("Order Not Found");
    error.status = 404;
    error.body = "Order Not Found";
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.status(201).json(updatedOrder);
  } else {
    const error = new Error("Order Not Found");
    error.status = 404;
    error.body = "Order Not Found";
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

const getMyOrders = async (req, res) => {
  console.log(req);
  const orders = await Order.find({ user: req.user._id });
  res.status(201).json({
    status: "success",
    result: 1,
    data: {
      orders,
    },
  });
};
const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(201).json({
    status: "success",
    result: 1,
    data: {
      orders,
    },
  });
};
export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
