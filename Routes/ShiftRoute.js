const express = require('express');
const router = express.Router();
const Shift = require('../Models/ShiftModel');

// Get all shifts
router.get('/', async (req, res) => {
  try {
    const shifts = await Shift.find().sort({ timestamp: 1 });
    res.json(shifts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new shift
router.post('/', async (req, res) => {
  try {
    const newShift = new Shift();
    await newShift.save();
    res.status(201).json(newShift);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
