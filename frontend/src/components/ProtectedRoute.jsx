import { Navigate, Outlet } from 'react-router-dom'
import api from '../api/axios';
import { useEffect, useState } from "react";

function ProtectedRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                await api.get('/users/current-user')
                setIsAuthenticated(true);
            }
            catch (error) {
                console.log(error);
                setIsAuthenticated(false);
            }
        }
        checkUser();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return <Outlet />
}

export default ProtectedRoute
