import api from "./api.js"

export async function login(email, password) {
  try {
    const response = await api.post('/auth/login', { email, password });    
    return response.data;
  } catch (error) {
    throw new Error("Lỗi khi đăng nhập");
  }
}

export async function register(email, password, username) {
  try {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  } catch (error) {
    throw new Error("Lỗi khi đăng ký");
  }
}