const Order = require("../models/Orders");
const Menu = require("../models/Menu");

// Generate unique order number
const generateOrderNumber = () => {
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { items, cashierName, paymentMethod, tableNumber, notes } = req.body;

    // Validate items and calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const menuItemId =
        typeof item === "string"
          ? item
          : item.menuItem || item._id || item.menuItemId;

      const menuItem = await Menu.findById(menuItemId);
      if (!menuItem) {
        return res
          .status(404)
          .json({ error: `Menu item not found: ${menuItemId}` });
      }

      const quantity = item.quantity || 1;

      const itemTotal = menuItem.price * quantity;
      totalAmount += itemTotal;

      orderItems.push({
        menuItemId: menuItemId,
        menuItemName: menuItem.menuItemName,
        quantity: quantity,
        price: menuItem.price,
        emoji: menuItem.emoji,
      });
    }

    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      items: orderItems,
      totalAmount,
      cashierName,
      paymentMethod,
      tableNumber,
      notes,
      orderStatus: "Pending",
    });

    return res.status(201).json(order);
  } catch (err) {
    console.error("Error creating order:", err);
    return res
      .status(500)
      .json({ error: "Server error", details: err.message });
  }
};

//  Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    if (!orders || orders.length === 0)
      return res.status(404).json({ error: "No orders found" });
    return res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

//  Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    return res.status(200).json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

//  Update order by ID
exports.updateOrderById = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    return res.status(200).json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

//  Delete order by ID
exports.deleteOrderById = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

//  Get orders by cashier name
exports.getOrdersByCashierName = async (req, res) => {
  try {
    const { cashierName } = req.params;
    const orders = await Order.find({ cashierName }).sort({ createdAt: -1 });
    if (orders.length === 0)
      return res
        .status(404)
        .json({ error: "No orders found for this cashier" });
    return res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

//  Search orders by order number or cashier name
exports.searchOrders = async (req, res) => {
  try {
    const search = req.query.search || "";
    const query = search
      ? {
          $or: [
            { orderNumber: { $regex: search, $options: "i" } },
            { cashierName: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const orders = await Order.find(query).sort({ createdAt: -1 }).limit(20);
    if (orders.length === 0)
      return res.status(404).json({ error: "No orders found" });
    return res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

//  Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = [
      "Pending",
      "Preparing",
      "Ready",
      "Completed",
      "Cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid order status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true, runValidators: true }
    );

    if (!order) return res.status(404).json({ error: "Order not found" });
    return res.status(200).json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
