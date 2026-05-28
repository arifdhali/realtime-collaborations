import { Outlet } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../Api";
import {
    setUser,
    stopLoading
} from "../features/authSlice";

const AuthInitializer = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        const restoreSession = async () => {

            try {

                const res = await api.get("/auth/me");

                if (res.data.success) {
                    dispatch(setUser(res.data.data));
                } else {
                    dispatch(stopLoading());
                }

            } catch (err) {
                dispatch(stopLoading());
            }
        };

        restoreSession();

    }, []);
  
    return <Outlet />;
};

export default AuthInitializer;