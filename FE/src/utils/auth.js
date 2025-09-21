export const isTokenValid = (token) => {
  if (!token) return false;
  
  try {
    // Decode JWT payload (không verify signature ở frontend)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    // Kiểm tra token có hết hạn chưa
    return payload.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export const getTokenFromStorage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.accessToken || null;
};

export const removeToken = () => {
  localStorage.removeItem('user');
};