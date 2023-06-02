import axios from 'axios';
import { endpoints } from './endpoints';
const API_URL = 'http://localhost:7000/';

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `bearer ${localStorage.getItem(
        'accessToken'
    )}`;
    return config;
});

axiosInstance.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status == 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.post(
                    `${API_URL + endpoints.auth.refresh}`,
                    null,
                    { withCredentials: true }
                );
                localStorage.setItem('accessToken', response.data.accessToken);
                return axiosInstance.request(originalRequest);
            } catch (error) {
                console.log(error);
            }
        }
        throw error;
    }
);

export default axiosInstance;
