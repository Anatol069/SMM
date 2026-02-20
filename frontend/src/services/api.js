import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth APIs
export const authAPI = {
    register: (data) => api.post('/users/register', data),
    login: (data) => api.post('/users/login', data),
    getProfile: () => api.get('/users/profile'),
    updateProfile: (data) => api.patch('/users/profile', data),
};

// Posts APIs
export const postsAPI = {
    getAll: () => api.get('/posts'),
    getById: (id) => api.get(`/posts/${id}`),
    create: (data) => api.post('/posts', data),
    update: (id, data) => api.patch(`/posts/${id}`, data),
    delete: (id) => api.delete(`/posts/${id}`),
};

// Media APIs
export const mediaAPI = {
    getAll: () => api.get('/media'),
    getById: (id) => api.get(`/media/${id}`),
    create: (data) => api.post('/media', data),
    delete: (id) => api.delete(`/media/${id}`),
};

// Social Accounts APIs
export const socialAccountsAPI = {
    getAll: () => api.get('/social-accounts'),
    getById: (id) => api.get(`/social-accounts/${id}`),
    create: (data) => api.post('/social-accounts', data),
    update: (id, data) => api.patch(`/social-accounts/${id}`, data),
    delete: (id) => api.delete(`/social-accounts/${id}`),
};

// Analytics APIs
export const analyticsAPI = {
    getOverview: () => api.get('/analytics/overview'),
    getPostAnalytics: (id) => api.get(`/analytics/posts/${id}`),
    getByDateRange: (startDate, endDate) =>
        api.get('/analytics/range', { params: { startDate, endDate } }),
};

export default api;
