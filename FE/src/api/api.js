import axios from 'axios';
import { getRefreshTokenFromStorage, saveTokensToStorage, removeTokens } from '../utils/auth.js';

const API_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Interceptor để tự động thêm token vào mỗi request
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.accessToken;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  } 
);

// Interceptor để xử lý response lỗi (token hết hạn)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshTokenFromStorage();
      
      if (!refreshToken) {
        processQueue(error, null);
        removeTokens();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken
        });
        
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        const user = JSON.parse(localStorage.getItem('user'));
        
        // Update tokens in storage
        const updatedUser = {
          ...user,
          accessToken,
          refreshToken: newRefreshToken
        };
        saveTokensToStorage(updatedUser);
        
        // Update authorization header
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        
        processQueue(null, accessToken);
        
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        removeTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;