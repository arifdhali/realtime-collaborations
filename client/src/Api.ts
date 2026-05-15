import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
})
api.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status == 403) {
        window.location.href = "/auth/login";

    }
    return Promise.reject(error);
})
export default api;