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
  if (!user) return null;
  return user?.accessToken || null;
};

export const getRefreshTokenFromStorage = () => {
  const user = JSON.parse(localStorage.getItem('user'));  
  if (!user) return null;
  return user?.refreshToken || null;
};

export const saveTokensToStorage = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
};

export const removeTokens = () => {
  localStorage.removeItem('user');
};