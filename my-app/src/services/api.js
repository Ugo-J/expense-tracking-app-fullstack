import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Change this to your computer's IP address if testing on physical device
// For Android emulator: use 10.0.2.2
// For iOS simulator: use localhost
// if testing on a physical device set to local ip address.
const API_URL = 'http://10.160.63.29:3000'; // 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests automatically
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// Expense APIs
export const expenseAPI = {
  create: (data) => api.post('/expenses', data),
  getAll: (params) => api.get('/expenses', { params }),
  getSummary: () => api.get('/expenses/summary'),
  update: (id, data) => api.put(`/expenses/${id}`, data),
  delete: (id) => api.delete(`/expenses/${id}`),
};

export default api;