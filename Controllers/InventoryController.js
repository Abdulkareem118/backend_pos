const Inventory = require('../Models/InventoryModel');

// Get all inventory
const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add new item
const addInventory = async (req, res) => {
  try {
    const { name, stock } = req.body;
    const newItem = new Inventory({ name, stock });
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update stock and sell quantity
const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock, sellQuantity } = req.body;
    const updatedItem = await Inventory.findByIdAndUpdate(
      id,
      { stock, sellQuantity },
      { new: true }
    );
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an item
const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;
    await Inventory.findByIdAndDelete(id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getInventory,
  addInventory,
  updateInventory,
  deleteInventory,
};
