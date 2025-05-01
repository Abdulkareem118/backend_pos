const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Shift', shiftSchema);
