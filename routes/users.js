const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');

// Create user
router.post('/', async (req, res) => {
  try {
    const { name, email, role } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'name and email are required' });
    const user = new User({ name, email, role });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'email already exists' });
    res.status(500).json({ message: err.message });
  }
});

// Read all users (with simple pagination)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const users = await User.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await User.countDocuments();
    res.json({ total, page, limit, users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read one
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'invalid id' });
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'user not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'invalid id' });
    const updates = (({ name, email, role }) => ({ name, email, role }))(req.body);
    const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ message: 'user not found' });
    res.json(user);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'email already exists' });
    res.status(500).json({ message: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'invalid id' });
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'user not found' });
    res.json({ message: 'deleted', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
