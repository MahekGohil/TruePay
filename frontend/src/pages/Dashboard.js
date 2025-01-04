import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:5000/api/auth/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          console.error('Error fetching user details:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const fetchTransactions = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:5000/api/transaction', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setTransactions(data.transactions);
        } else {
          console.error('Error fetching transactions:', data.message);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchUserDetails();
    fetchTransactions();
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {user.name || ''}!</h2>
      <p>Your UPI ID: <strong>{user.upiId || 'Loading...'}</strong></p>
      <p>Email: <strong>{user.email || 'Loading...'}</strong></p>
      <p>Total Balance: ₹<strong>{user.balance || '0'}</strong></p>
      <h3>Recent Transactions</h3>
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <div key={transaction._id} className="transaction">
            <p>{transaction.description}</p>
            <p>Amount: ₹{transaction.amount}</p>
            <p>Date: {new Date(transaction.date).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No transactions yet.</p>
      )}
    </div>
  );
}

export default Dashboard;
