import { useAuth } from '../context/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';
function ProtectedRoutes() {
    const { user, isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to='/' replace />
    return (
        <Outlet />
    )
}
export default ProtectedRoutes;