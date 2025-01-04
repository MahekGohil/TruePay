import React, { useState, useEffect } from 'react';

function Transactions() {
  const [upiId, setUpiId] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    const fetchUpiId = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:5000/api/auth/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUpiId(data.upiId);
      } catch (error) {
        console.error('Error fetching UPI ID:', error);
      }
    };

    fetchUpiId();
  }, []);

  const handleTransaction = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description, amount }),
      });

      const data = await response.json();
      if (response.ok) {
        setReceipt({
          id: data.transaction._id,
          description: data.transaction.description,
          amount: data.transaction.amount,
          date: data.transaction.date,
        });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Transaction Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (receipt) {
    return (
      <div className="container">
        <h3>Transaction Receipt</h3>
        <p>Transaction ID: {receipt.id}</p>
        <p>Description: {receipt.description}</p>
        <p>Amount: ₹{receipt.amount}</p>
        <p>Date: {new Date(receipt.date).toLocaleString()}</p>
        <button onClick={() => setReceipt(null)}>Make Another Transaction</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Transactions</h2>
      <p>Your UPI ID: <strong>{upiId || 'Loading...'}</strong></p>
      <form onSubmit={handleTransaction}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Submit Transaction</button>
      </form>
    </div>
  );
}

export default Transactions;
