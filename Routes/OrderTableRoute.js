const express = require('express');
const router = express.Router();
const Order = require('../Models/OrderTable');
const Menu = require('../Models/menuItems');

// Helper: Load menu from DB
const getMenu = async () => {
  return await Menu.find({});
};

// POST /api/orders - Create new order
router.post('/', async (req, res) => {
  try {
    const { tableNumber, items } = req.body;

    if (!tableNumber || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Invalid input: tableNumber or items missing' });
    }

    const menu = await getMenu();
    let totalPrice = 0;
    const processedItems = [];

    for (const { itemId, quantity } of items) {
      const item = menu.find(i => i._id.toString() === itemId);
      if (!item) {
        return res.status(400).json({ error: `Invalid item ID: ${itemId}` });
      }

      const itemTotal = item.price * quantity;
      totalPrice += itemTotal;

      processedItems.push({
        itemName: item.name,
        quantity,
        totalPrice: itemTotal
      });
    }

    const order = new Order({
      tableNumber,
      items: processedItems,
      totalPrice
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/orders/:id/complete
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

// POST /api/orders/:id/add-item
router.post('/:id/add-item', async (req, res) => {
  try {
    const { itemId, quantity } = req.body;

    const menu = await getMenu();
    const item = menu.find(i => i._id.toString() === itemId);
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
