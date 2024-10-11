// routes/comments.js
const express = require('express');
const Comment = require('../models/comment');
const Post = require('../models/post');
const auth = require('../middleware/auth');
const router = express.Router();

// Add a comment to a post
router.post('/:postId', auth, async (req, res) => {
    const { content } = req.body;
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        const comment = new Comment({
            content,
            author: req.user.id,
            post: postId
        });

        await comment.save();
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get all comments for a post
router.get('/:postId', async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId }).populate('author', 'username');
        res.json(comments);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Delete a comment by ID
router.delete('/:commentId', auth, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }

        if (comment.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }

        await comment.remove();
        res.json({ msg: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;