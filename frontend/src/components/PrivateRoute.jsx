import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

const PrivateRoute = () => {
    const { isAuthenticated, status } = useAppSelector((state) => state.auth);

    if (status === 'loading') {
        // Optionally show a loading spinner while checking auth status
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;