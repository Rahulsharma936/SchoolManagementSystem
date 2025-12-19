import axios from 'axios';

// Create an Axios instance with a dynamic base URL
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

// Configure interceptors to automatically add the token if it exists
api.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const token = JSON.parse(userInfo).token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
