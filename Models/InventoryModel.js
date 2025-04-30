const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  stock: { type: Number, required: true },
  sellQuantity: { type: Number, default: 0 },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
