// auth.controller.js
// import pool from "../config/db.js"; // chỗ bạn đã setup
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
import {userModel} from "../models/userModel.js"; // Giả sử bạn có userModel để tương tác với DB

export const login = async (req, res) => {
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
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};


export const authController = {
  login,
};
