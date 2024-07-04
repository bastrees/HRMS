import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Home from './pages/customer/Home';
import CustomerHome from './pages/customer/Home';
import ManagerDashboard from './pages/manager/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
// Import other pages...

const App = () => {
    const userRole = localStorage.getItem('userRole');

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/home" element={<Home />} />
                {userRole === 'customer' && (
                    <Route path="/" element={<CustomerHome />} />
                )}
                {userRole === 'manager' && (
                    <ProtectedRoute path="/" element={<ManagerDashboard />} roles={['manager']} />
                )}
                {userRole === 'admin' && (
                    <ProtectedRoute path="/" element={<AdminDashboard />} roles={['admin']} />
                )}
                <Route path="*" element={<Navigate to="/auth" />} />
            </Routes>
        </Router>
    );
};

export default App;
