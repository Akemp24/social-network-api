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

// Get single user by ID
router.get('/:userId', async (req,res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'An error occured while fetching the user'});
    }
});

// update user
router.put('/:userId', async (req,res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true});
    } catch (error) {
        res.status(400).json({ error: 'Failed to update the user'});
    }
});

// delete user
router.delete('/:userId', async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.json({ message: 'User deleted successfully.' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete the user.' });
    }
  });

// add friend to user
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $push: { friends: req.params.friendId } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add friend to user.' });
  }
});

// remove friend from user
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Failed to remove friend from user.' });
    }
  });

//   export
module.exports = router;
