import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBolt,
  faMobileAlt,
  faTv,
  faTint,
} from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleQuickAction = async (description) => {
    const amount = prompt(`Enter the amount for ${description}:`);
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Invalid amount entered!');
      return;
    }

    const pin = prompt('Enter your PIN for this transaction:');
    if (!pin) {
      alert('PIN is required!');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description, amount: parseFloat(amount), pin }),
      });

      if (!response.ok) {
        throw new Error('Transaction failed!');
      }

      alert(`${description} transaction of ₹${amount} successful!`);
      window.location.reload(); // Refresh to show updated data
    } catch (error) {
      alert('Transaction failed: ' + error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const userResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = await userResponse.json();
        setUser(userData);

        const transactionResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/transaction`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const transactionData = await transactionResponse.json();
        setTransactions(transactionData.transactions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h2>Welcome, {user.name || 'User'}!</h2>
      <p>Your UPI ID: {user.upiId || 'N/A'}</p>
      <p>Balance: ₹{user.balance || '0.00'}</p>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <div className="action-item" onClick={() => handleQuickAction('Electricity Bill')}>
            <FontAwesomeIcon icon={faBolt} size="2x" />
            <p>Electricity Bill</p>
          </div>
          <div className="action-item" onClick={() => handleQuickAction('Mobile Recharge')}>
            <FontAwesomeIcon icon={faMobileAlt} size="2x" />
            <p>Mobile Recharge</p>
          </div>
          <div className="action-item" onClick={() => handleQuickAction('DTH Recharge')}>
            <FontAwesomeIcon icon={faTv} size="2x" />
            <p>DTH Recharge</p>
          </div>
          <div className="action-item" onClick={() => handleQuickAction('Water Bill')}>
            <FontAwesomeIcon icon={faTint} size="2x" />
            <p>Water Bill</p>
          </div>
        </div>
      </div>

      <h3>Recent Transactions</h3>
      {transactions.length > 0 ? (
        transactions.map((txn) => (
          <div key={txn._id} className="transaction">
            <p>{txn.description}</p>
            <p>Amount: ₹{txn.amount}</p>
            <p>Date: {new Date(txn.date).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No transactions available.</p>
      )}
    </div>
  );
}

export default Dashboard;
