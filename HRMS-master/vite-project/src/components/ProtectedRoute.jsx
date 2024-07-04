import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, roles, ...rest }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if (!token) {
        return <Navigate to="/auth" />;
    }

    if (!roles.includes(userRole)) {
        return <Navigate to="/auth" />;
    }

    return <Route {...rest} element={Component} />;
};

export default ProtectedRoute;
