const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
});

// Pre-save hook to hash password before saving
UserSchema.pre('save', async function (next) {
    try {
        // Check if the password is modified (for updates)
        if (!this.isModified('password')) return next();

        // Hash the password with bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);

        // Set the hashed password
        this.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare entered password with hashed password in the database
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create User model from the schema
const User = mongoose.model('User', UserSchema);

module.exports = User;