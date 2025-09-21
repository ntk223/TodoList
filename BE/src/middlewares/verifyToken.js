import jwt from 'jsonwebtoken';
import { env } from '../config/environment.js';
import ApiError from '../utils/ApiError.js';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    throw new ApiError(401, 'Access token required');
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded; // Lưu thông tin user vào request
    next();
  } catch (error) {
    throw new ApiError(401, 'Invalid or expired token');
  }
};

export default verifyToken;