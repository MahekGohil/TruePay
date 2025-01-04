const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Required field for linking transactions to users
  upiId: { type: String, default: uuidv4 }, // Default UPI ID
  description: { type: String, required: true }, // Ensure description is required
  amount: { type: Number, required: true }, // Ensure amount is required
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
