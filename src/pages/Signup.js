import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // useNavigate instead of useHistory

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');  // Redirect to Dashboard
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required style={{ margin: '1rem', padding: '0.5rem' }} />
        <br />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required style={{ margin: '1rem', padding: '0.5rem' }} />
        <br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required style={{ margin: '1rem', padding: '0.5rem' }} />
        <br />
        <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
          Signup
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p style={{ marginTop: '1rem' }}>
        Already have an account? <Link to="/login" style={{ color: '#007bff' }}>Login here</Link>
      </p>
    </div>
  );
}

export default Signup;
