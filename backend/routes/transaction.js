const express = require('express');
const Transaction = require('../models/Transaction');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

// POST: Create a new transaction
router.post('/', authenticateToken, async (req, res) => {
  const { description, amount } = req.body;

  if (!description || !amount) {
    return res.status(400).json({ message: 'Description and amount are required.' });
  }

  try {
    const transaction = new Transaction({
      userId: req.userId, // Assign the userId from the token
      description,
      amount,
    });
    await transaction.save();
    res.json({ message: 'Transaction added successfully!', transaction });
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(400).json({ message: 'Failed to add transaction.', error: error.message });
  }
});

// GET: Retrieve all transactions for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId });
    res.json({ transactions });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Failed to fetch transactions.', error: error.message });
  }
});

module.exports = router;
