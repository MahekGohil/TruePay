import React from 'react';

function Transactions() {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Your Transactions</h2>
      <ul>
        <li>₹500 to John Doe - Completed</li>
        <li>₹200 from Jane Smith - Pending</li>
        <li>₹1000 to Alice - Completed</li>
      </ul>
    </div>
  );
}

export default Transactions;
