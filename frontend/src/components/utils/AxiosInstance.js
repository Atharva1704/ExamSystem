import axios from "axios";
import { store } from "../../redux/store"; // Update with the correct path to your Redux store

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, // Backend base URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.user.jwtToken; // Get token from Redux state
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
