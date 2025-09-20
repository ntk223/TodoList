// auth.controller.js
// import pool from "../config/db.js"; // chỗ bạn đã setup
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
import {userModel} from "../models/userModel.js"; // Giả sử bạn có userModel để tương tác với DB

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);
    if (!user) {
      return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
    }
    else {
        return res.status(200).json({ message: "Đăng nhập thành công", user });
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

export const authController = {
  login,
  register
};
