const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  // Create JWT token
  const token = jwt.sign({ id: newUser._id }, "5a00cdc0548fcf04c56de472e4e543145d145140bc839341c428a7bdd6d8334bbf9e9b764bf730159a4eb4a186b2951241b86668d36316b0f17b53147be549de", {
    expiresIn: '1h',
  });

  res.status(201).json({ token });
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Create JWT token
  const token = jwt.sign({ id: user._id }, "5a00cdc0548fcf04c56de472e4e543145d145140bc839341c428a7bdd6d8334bbf9e9b764bf730159a4eb4a186b2951241b86668d36316b0f17b53147be549de", {
    expiresIn: '1h',
  });

  res.status(200).json({ token });
});

module.exports = router;
