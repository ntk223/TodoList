import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#f5f5f5' }}>
        <Link to="/home" style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
        <Link to="/user-profile" style={{ textDecoration: 'none', color: '#333' }}>User Profile</Link>
    </nav>
);

export default Navbar;