import { useEffect } from "react";
import api from "../Api";
import { useLocation, useNavigate } from "react-router";


const useAxiosInterceptor = () => {
    let navigate = useNavigate();
    let location = useLocation();


    useEffect(() => {
        let interceptor = api.interceptors.response.use(
            (response) => response,
            (error) => {
                 if (error.response?.status == 403) {
                    navigate("/auth/login", {
                        state: {
                            from: location
                        },
                        replace: true
                    },)
                }
                return Promise.reject(error);
            })

        return () => {
            api.interceptors.response.eject(interceptor);
        }
    }, [location, navigate])

}

export default useAxiosInterceptor;