const express = require('express');
const MenuItem = require('../Models/menuItems');

const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items' });
  }
});

// Add a new menu item
router.post('/', async (req, res) => {
  const { name, price, category, stock } = req.body; // 👈 Added stock

  try {
    const newItem = new MenuItem({ name, price, category, stock }); // 👈 Added stock
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding menu item' });
  }
});

// PUT update item
router.put('/:id', async (req, res) => {
  const { name, category, price, stock } = req.body; // 👈 Added stock

  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, category, price, stock }, // 👈 Added stock
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update item' });
  }
});

// DELETE item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete item' });
  }
});

module.exports = router;
