const mongoose = require('mongoose');

// Define the Blog Post schema
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the Post model
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;