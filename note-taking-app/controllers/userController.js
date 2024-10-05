// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require ('dotenv')
dotenv.config()

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    // ... Input validation (check if fields are empty, password strength, etc.)

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        // Generate JWT token
        const token = generateToken(newUser._id);
        res.status(201).json({ token });

    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken(user._id);
        res.json({ token }); 

    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
};

exports.getUserProfile = async (req, res) => {
    res.json({ message: 'User profile' });
};

// Helper function to generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId },process.env.JWT_SECRET, { expiresIn: '30d' });
};