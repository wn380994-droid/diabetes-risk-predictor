import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// ⭐ Request တိုင်းမှာ JWT Token ထည့်ခြင်း
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem('user');
  if (stored) {
    try {
      const user = JSON.parse(stored);
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    } catch (e) {}
  }
  return config;
});

// ⭐ 401 တက်ရင် logout လုပ်ခြင်း
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth
export const registerUser = async (data) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Predictions
export const createPrediction = async (userData) => {
  const response = await api.post('/predictions', userData);
  return response.data;
};

export const getAllPredictions = async () => {
  const response = await api.get('/predictions');
  return response.data;
};

export const deletePrediction = async (id) => {
  const response = await api.delete(`/predictions/${id}`);
  return response.data;
};

// Admin
export const getAllPredictionsAdmin = async () => {
  const response = await api.get('/predictions/admin/all');
  return response.data;
};

// Chat
export const sendChatMessage = async (message) => {
  const response = await api.post('/chat', { message });
  return response.data;
};

export const getChatHistory = async () => {
  const response = await api.get('/chat/history');
  return response.data;
};

// Admin APIs
export const getAdminStats = async () => {
  const response = await api.get('/admin/stats');
  return response.data;
};

export const getAdminUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};

export const updateUserRole = async (id, role) => {
  const response = await api.put(`/admin/users/${id}/role`, { role });
  return response.data;
};

export const getAdminChats = async () => {
  const response = await api.get('/admin/chats');
  return response.data;
};

export default api;