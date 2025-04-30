const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  itemName: String,
  quantity: Number,
  totalPrice: Number,
});

const OrderSchema = new mongoose.Schema({
  tableNumber: { type: String, required: true },
  items: [ItemSchema],
  totalPrice: { type: Number, default: 0 },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  completedAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
