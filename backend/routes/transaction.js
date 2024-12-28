// routes/transaction.js
const express = require('express');
const Transaction = require('../models/Transaction');
const authenticateToken = require('../middleware/authenticateToken'); // Correct middleware

const router = express.Router();

// Get transactions for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Use req.user.id after authentication to get user ID
    const transactions = await Transaction.find({ userId: req.user.id });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions' });
  }
});

// Create a transaction
router.post('/', authenticateToken, async (req, res) => {
  const { amount, description } = req.body;
  
  try {
    const transaction = new Transaction({
      userId: req.user.id, // Correctly use req.user.id
      amount,
      description
    });

    await transaction.save();
    res.status(201).json({ message: 'Transaction created successfully', transaction });
  } catch (error) {
    res.status(500).json({ message: 'Error creating transaction' });
  }
});

module.exports = router; // Correct export
