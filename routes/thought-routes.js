// routes/thought-routes.js

const express = require('express');
const { Thought } = require('../models');
const router = express.Router();

// GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching thoughts.' });
  }
});

// POST create thought
router.post('/', async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    res.json(newThought);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a new thought.' });
  }
});

//GET single thought

// UPDATE Thought

// DELETE thought

// CREATE rxn to thought

// DELETE rxn from thought

module.exports = router;
