import {store} from "../store/store";
import {refreshToken} from "../reducers/userReducer";
import api from "./setupApi";

api.interceptors.request.use(
    (config) => {
        if (!config.url?.startsWith('/auth')) {
            if (store.getState().userReducer.access_token) {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${store.getState().userReducer.access_token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newToken = await store.dispatch(
                    refreshToken(store.getState().userReducer.refresh_token)
                );
                if (newToken) {
                    originalRequest.headers = originalRequest.headers || {};
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;