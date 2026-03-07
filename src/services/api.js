import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Properties API
export const propertyAPI = {
  getAll: () => api.get('/properties'),
  getOne: (id) => api.get(`/properties/${id}`),
  create: (data) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    return api.post('/properties', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  update: (id, data) => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    return api.put(`/properties/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  delete: (id) => api.delete(`/properties/${id}`)
};

// Inquiries API
export const inquiryAPI = {
  create: (data) => api.post('/inquiries', data),
  getAll: () => api.get('/inquiries'),
  updateStatus: (id, status) => api.patch(`/inquiries/${id}`, { status }),
  delete: (id) => api.delete(`/inquiries/${id}`)
};

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials)
};

export default api;