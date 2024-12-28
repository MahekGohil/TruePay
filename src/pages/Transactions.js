// Transactions.js (Frontend)

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  // Fetch transactions when the component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Make an API request to the backend to fetch transactions
        const response = await axios.get('http://localhost:5000/api/transactions', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token in header
          },
        });

        // Set the response data (transactions) to state
        setTransactions(response.data);
      } catch (err) {
        setError('Failed to fetch transactions.');
      }
    };

    fetchTransactions();
  }, []); // Empty dependency array ensures this runs on component mount only

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Your Transactions</h2>
      
      {/* Display error if there's an issue fetching transactions */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display transactions */}
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id}>
              ₹{transaction.amount} to {transaction.to} - {transaction.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions available.</p>
      )}
    </div>
  );
}

export default Transactions;
