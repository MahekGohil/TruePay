import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">TruePay</div>
      <div className="nav-links">
        <Link to="/"><button>Home</button></Link>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/signup"><button>Signup</button></Link>
        <Link to="/dashboard"><button>Dashboard</button></Link>
        <Link to="/transactions"><button>Transactions</button></Link>
      </div>
    </nav>
  );
}

export default Navbar;