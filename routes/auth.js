const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const crypto = require('crypto');
const transporter = require('../utils/email');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new user
        user = new User({
            username,
            email,
            password,
        });

        // Save user to database
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// Password reset route
router.post('/password-reset', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        // Generate a reset token
        const token = crypto.randomBytes(32).toString('hex');
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000; // 1 hour expiration

        // Save user with reset token
        await user.save();

        // Send password reset email
        const resetUrl = `http://your-frontend-url.com/reset-password/${token}`; // Update with your frontend URL
        await transporter.sendMail({
            to: email,
            from: process.env.SMTP_USER, // Your email address (the sender)
            subject: 'Password Reset',
            html: `<p>You requested a password reset</p>
                   <p>Click this <a href="${resetUrl}">link</a> to reset your password. This link expires in 1 hour.</p>`
        });

        res.json({ msg: 'Password reset email sent' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Logout route (optional for token-based auth)
router.post('/logout', (req, res) => {
    // Since we're using token-based auth, to 'logout' the client would simply need to discard the token on their end
    res.send('Logged out successfully');
});

module.exports = router;