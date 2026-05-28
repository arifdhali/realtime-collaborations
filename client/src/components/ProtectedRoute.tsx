import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router';

const ProtectedRoute = () => {

    const { isAuthenticated, isLoading } = useSelector((state) => state?.auth);
    const location = useLocation();
    if (isLoading) { 
        return;
    }

    if (!isAuthenticated) {
        return (
            <Navigate to={"/auth/login"}
                replace={true}
                state={{ from: location }}
            />
        )

    }
    return <Outlet />;
};

export default ProtectedRoute;