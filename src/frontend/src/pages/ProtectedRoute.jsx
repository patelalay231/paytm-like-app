import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element: Component }) {
    const isAuthenticated = localStorage.getItem('token'); // Assuming token in localStorage indicates authentication

    return isAuthenticated ? <Component /> : <Navigate to="/signin" />;
}

export default ProtectedRoute;
