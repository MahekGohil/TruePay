// Import necessary modules
require('dotenv').config();  // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/auth');  // Assuming you have auth routes
const transactionRoutes = require('./routes/transaction');  // Assuming you have transaction routes

// Initialize express app
const app = express();

// Middleware
app.use(express.json());  // Parse incoming JSON requests
app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS)

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Basic route to check if server is running
app.get('/', (req, res) => {
  res.send('Server is up and running');
});

// Use routes for authentication and transactions
app.use('/api/auth', userRoutes);  // Authentication routes
app.use('/api/transactions', transactionRoutes);  // Transaction routes

// Error handling middleware (for non-existent routes)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling for general server issues
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log the error stack for debugging
  res.status(500).json({ message: 'Something went wrong, please try again later' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
