import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// API endpoints
export const authAPI = {
  signup: (data: { email: string; password: string }) => api.post('/auth/signup', data),
  signin: (data: { email: string; password: string }) => api.post('/auth/signin', data),
};

export const userAPI = {
  getMe: () => api.get('/users/me'),
  updateProfile: (data: { firstName?: string; lastName?: string; email?: string }) => 
    api.patch('/users', data),
};

export const bookmarkAPI = {
  getAll: () => api.get('/bookmarks'),
  create: (data: { title: string; link: string; description?: string }) => 
    api.post('/bookmarks', data),
  getById: (id: string) => api.get(`/bookmarks/${id}`),
  update: (id: string, data: { title?: string; link?: string; description?: string }) => 
    api.patch(`/bookmarks/${id}`, data),
  delete: (id: string) => api.delete(`/bookmarks/${id}`),
};