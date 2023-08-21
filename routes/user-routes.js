// routes/user-routes.js

const express = require('express');
const { User } = require('../models');
const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
});

// POST create user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a new user.' });
  }
});

// ... Define other user routes ...

module.exports = router;
