import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router';
import api from '../Api';
import { setUser, stopLoading } from '../features/authSlice';

const NormalRoutes = () => {
    let dispatch = useDispatch();

    useLayoutEffect(() => {
        async function restoreSession() {
            try {
                let user = await api.get("/auth/me");
                if (user.data.success) {
                    dispatch(setUser(user.data.data));
                }
            } catch (err) {
                dispatch(stopLoading());
            }
        }

        restoreSession();
    }, [])
    return <Outlet />;

}

export default NormalRoutes
