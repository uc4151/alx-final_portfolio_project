const express = require('express');
const Post = require('../models/post');
const auth = require('../middleware/auth'); // Import JWT middleware
const router = express.Router();

// Create a new post (requires authentication)
router.post('/', auth, async (req, res) => {
    const { title, content } = req.body;

    try {
        // Create a new post and attach the authenticated user's ID as the author
        const post = new Post({
            title,
            content,
            author: req.user // The user ID from the JWT token
        });

        // Save the post to the database
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get all posts (public)
router.get('/', async (req, res) => {
    try {
        // Retrieve all posts from the database
        const posts = await Post.find().populate('author', 'username'); // Populate the author's username
        res.json(posts);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get a single post by ID (public)
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username');
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Update a post by ID (requires authentication)
router.put('/:id', auth, async (req, res) => {
    const { title, content } = req.body;

    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true } // Return the updated post
        );

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Delete a post by ID (requires authentication)
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json({ msg: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;