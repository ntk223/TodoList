import {userModel} from "../models/userModel.js"; // Giả sử bạn có userModel để tương tác với DB
import jwt from 'jsonwebtoken';
import { env } from '../config/environment.js';
import ApiError from '../utils/ApiError.js';

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await userModel.login(email, password);
    if (!result) {
      return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
    }
    else {
        return res.status(200).json({ message: "Đăng nhập thành công", 
          user: {
            ...result.user,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
          } });
    }
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  const { email, password, username } = req.body;
  // console.log('Registering user:', { email, password, username });
  
  try {
    const newUser = await userModel.register(email, password, username);
    res.status(201).json({ message: "Đăng ký thành công", user: newUser });
  } catch (err) {
    next(err);
  }
}

const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    throw new ApiError(401, 'Refresh token required');
  }
  
  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);
    
    // Generate new access token
    const payload = { id: decoded.id, email: decoded.email };
    const newAccessToken = jwt.sign(
      payload,
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRE }
    );
    
    // Generate new refresh token
    const newRefreshToken = jwt.sign(
      payload,
      env.REFRESH_TOKEN_SECRET,
      { expiresIn: env.REFRESH_TOKEN_EXPIRE }
    );
    
    res.status(200).json({
      message: "Token refreshed successfully",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }
}

export const authController = {
  login,
  register,
  refreshToken
};
