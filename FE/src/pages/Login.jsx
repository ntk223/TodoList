import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <- import hook
import { login } from "../api/auth.js";
import { Link } from 'react-router-dom';
export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // <- tạo navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);
      console.log(data);

      if (data.user) {
        setMessage("✅ Đăng nhập thành công!");

        // Lưu user vào localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        // Cập nhật state user ở App.jsx
        if (setUser) setUser(data.user);

        // Chuyển sang trang Home
        navigate("/");
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      setMessage("❌ Lỗi server: " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Đăng nhập</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full p-2 mb-3 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Đăng nhập
        </button>

        {message && (
          <p className="mt-3 text-center text-sm text-red-500">{message}</p>
        )}
      </form>
      <div>
        <Link to="/register" className="text-blue-500 hover:underline">
          Chưa có tài khoản? Đăng ký ngay
        </Link>
      </div>

    </div>
  );
}
