import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import { isTokenValid, getTokenFromStorage, removeToken } from "./utils/auth.js";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra token khi app khởi động
    const checkAuth = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = getTokenFromStorage();
      
      if (storedUser && token && isTokenValid(token)) {
        setUser(storedUser);
      } else {
        // Token không hợp lệ hoặc hết hạn
        removeToken();
        setUser(null);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    removeToken();
    setUser(null);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route
          path="/register"
          element={<Register/>}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
        />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            user ? <Home user={user} setUser={setUser} onLogout={handleLogout} /> : <Navigate to="/login" />
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;