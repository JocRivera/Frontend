import { useAuth } from '../context/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoutes({ allowedRoles = [] }) {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) return <Navigate to='/' replace />;
    if (allowedRoles.length && !allowedRoles.includes(user.rol)) {
        return <Navigate to='/' replace />;
    }

    return <Outlet />;
}

export default ProtectedRoutes;
