import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../api/auth';
import './Auth.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const navigate = useNavigate();

    const toggleMode = () => {
        setIsLogin(!isLogin);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                console.log('Login Payload:', { username, password });
                const response = await auth.login(username, password);
                console.log('Login Response:', response.data);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userRole', response.data.role);
                navigate('/');
            } else {
                console.log('Register Payload:', { username, password, role });
                await auth.register(username, password, role);
                setIsLogin(true);
            }
        } catch (err) {
            console.error('Error during authentication:', err);
        }
    };
    

    return (
        <div className="auth-container">
            <h1>{isLogin ? 'Login' : 'Register'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {!isLogin && (
                    <div>
                        <label>Role:</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="customer">Customer</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                )}
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <button onClick={toggleMode}>
                {isLogin ? 'New here? Register' : 'Already have an account? Login'}
            </button>
        </div>
    );
};

export default Auth;
