import api from "./api.js"

export async function login(email, password) {
  try {
    const response = await api.post('/auth/login', { email, password });    
    const { accessToken, user } = response.data;
    return { accessToken, user };
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