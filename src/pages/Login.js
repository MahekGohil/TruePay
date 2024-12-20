import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Login</h2>
      <form>
        <input type="text" placeholder="Email" required style={{ margin: '1rem', padding: '0.5rem' }} />
        <br />
        <input type="password" placeholder="Password" required style={{ margin: '1rem', padding: '0.5rem' }} />
        <br />
        <button style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
          Login
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        New user? <Link to="/signup" style={{ color: '#007bff' }}>Signup here</Link>
      </p>
    </div>
  );
}

export default Login;
