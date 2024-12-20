import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Signup</h2>
      <form>
        <input type="text" placeholder="Name" required style={{ margin: '1rem', padding: '0.5rem' }} />
        <br />
        <input type="email" placeholder="Email" required style={{ margin: '1rem', padding: '0.5rem' }} />
        <br />
        <input type="password" placeholder="Password" required style={{ margin: '1rem', padding: '0.5rem' }} />
        <br />
        <button style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
          Signup
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Already have an account? <Link to="/login" style={{ color: '#007bff' }}>Login here</Link>
      </p>
    </div>
  );
}

export default Signup;
