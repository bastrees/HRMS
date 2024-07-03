import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../api/auth';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await auth.register(username, password, role);
            navigate('/login');
        } catch (err) {
            console.error('Error registering:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="register-form">
            <div>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
                <label>Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                </select>
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
