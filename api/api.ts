import axios from "axios";
import {useAccessToken} from "../utils/axiosUtils";
import {refreshTokenCall} from "./refreshToken";

const api = axios.create({
    baseURL: "http://192.168.43.254:5000/api/v1",
    withCredentials: true,
});

api.interceptors.request.use(
    async (config) => {
        if (!config.url?.startsWith('/auth')) {
            const token = await useAccessToken();
            if (token) {
                console.log('Token found', config.url, token);
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await refreshTokenCall();
                if (newToken) {
                    console.log('New token', newToken);
                    originalRequest.headers = originalRequest.headers || {};
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
            }
        }
        return Promise.reject(error);
    }
);

export default api;