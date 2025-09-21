import api from "./api.js"

export async function login(email, password) {
  try {
    const response = await api.post('/auth/login', { email, password });    
    const { user } = response.data;
    return user; // This now includes both accessToken and refreshToken
  } catch (error) {
    throw new Error("Lỗi khi đăng nhập");
  }
}

export async function register(email, password, username) {
  
  try {
    const response = await api.post('/auth/register', { email, password, username });
    
    return response.data;
  } catch (error) {
      console.error("Lỗi:", error.response?.data);

    throw new Error("Lỗi khi đăng ký");
  }
}

export async function refreshAccessToken(refreshToken) {
  try {
    const response = await api.post('/auth/refresh', { refreshToken });
    return response.data; // { accessToken, refreshToken }
  } catch (error) {
    throw new Error("Lỗi khi làm mới token");
  }
}