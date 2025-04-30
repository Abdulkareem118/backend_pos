const express = require('express');
const router = express.Router();
const {
  getInventory,
  addInventory,
  updateInventory,
  deleteInventory,
} = require('../Controllers/InventoryController');

// Routes
router.get('/', getInventory);
router.post('/', addInventory);
router.put('/:id', updateInventory);
router.delete('/:id', deleteInventory);

module.exports = router;
