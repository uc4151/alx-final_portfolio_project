const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Initialize dotenv
dotenv.config();

// Initialize the app
const app = express();

// Use body-parser to handle form submissions
app.use(bodyParser.json());

// Basic route to check if server is running
app.get('/', (req, res) => {
   res.send('Welcome to Intelvibez Blog Platform!');
});

// Connect to MongoDB (replace with your MongoDB URI in .env)
mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(() => {
   console.log('MongoDB connected successfully');
}).catch((err) => {
   console.log('Error connecting to MongoDB', err);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});