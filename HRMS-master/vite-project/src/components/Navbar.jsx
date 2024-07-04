import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        navigate('/auth');
    };

    return (
        <nav>
            <h1>Hotel Booking</h1>
            <ul>
                <li><Link to="/home">Home</Link></li>
                {!token ? (
                    <li><Link to="/auth">Login/Register</Link></li>
                ) : (
                    <li><button onClick={handleLogout}>Logout</button></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
