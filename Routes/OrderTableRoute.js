const express = require('express');
const router = express.Router();
const Order = require('../Models/OrderTable');

// POST /api/orders - Create new order
router.post('/', async (req, res) => {
  try {
    const { tableNumber, itemId, quantity, menu } = req.body;
    const item = menu.find(i => i._id === itemId);
    if (!item) return res.status(400).json({ error: 'Invalid item ID' });

    const totalPrice = item.price * quantity;
    const order = new Order({
      tableNumber,
      items: [{ itemName: item.name, quantity, totalPrice }],
      totalPrice
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders - Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/orders/:id/complete - Mark order as completed
router.put('/:id/complete', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: 'Completed', completedAt: new Date() },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/orders/:id/add-item - Add item to existing order
router.post('/:id/add-item', async (req, res) => {
  try {
    const { itemId, quantity, menu } = req.body;
    const item = menu.find(i => i._id === itemId);
    if (!item) return res.status(400).json({ error: 'Invalid item ID' });

    const newItem = {
      itemName: item.name,
      quantity,
      totalPrice: item.price * quantity,
    };

    const order = await Order.findById(req.params.id);
    order.items.push(newItem);
    order.totalPrice += newItem.totalPrice;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
