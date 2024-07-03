import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../api/auth';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await auth.login(username, password);
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (err) {
            console.error('Error logging in:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <div>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
