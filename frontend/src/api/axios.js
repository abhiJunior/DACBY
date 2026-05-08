import axios from 'axios';

const api = axios.create({
  // use this http://localhost:5000 as a base url if running in dev
  baseURL: 'https://dacby-backend-lm1u.onrender.com',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;