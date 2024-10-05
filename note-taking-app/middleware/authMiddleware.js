// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Check if Authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            console.log("authorization reached")
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token,"5a00cdc0548fcf04c56de472e4e543145d145140bc839341c428a7bdd6d8334bbf9e9b764bf730159a4eb4a186b2951241b86668d36316b0f17b53147be549de");

            // Get user from the token (exclude password)
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Proceed to the next middleware/controller
        } catch (error) {
            // Token verification failed (e.g., invalid or expired token)
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // If no token is found in the header
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
