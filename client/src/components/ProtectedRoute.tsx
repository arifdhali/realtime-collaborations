import { useSelector } from 'react-redux';
import { Outlet, useLocation, Navigate } from 'react-router';

const ProtectedRoute = () => {
    const { isAuthenticated } = useSelector((state) => state?.auth);
    const location = useLocation();
     if (!isAuthenticated) {
        return (
            <Navigate to={"/auth/login"}
                replace={true}
                state={{ from: location }}
            />
        )

    }
    return <Outlet />;

}

export default ProtectedRoute
