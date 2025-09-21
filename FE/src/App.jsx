import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import { isTokenValid, getTokenFromStorage, getRefreshTokenFromStorage, removeTokens } from "./utils/auth.js";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra token khi app khởi động
    const checkAuth = () => {
      const storedUser = JSON.parse(localStorage.getItem("user")) // json -> object
      console.log(storedUser)
      const token = getTokenFromStorage();
      const refreshToken = getRefreshTokenFromStorage();
      
      if (storedUser && token && refreshToken) {
        // If access token is valid, user is authenticated
        if (isTokenValid(token)) {
          setUser(storedUser);
        } else if (isTokenValid(refreshToken)) {
          // Access token expired but refresh token is valid
          // The API interceptor will handle refreshing automatically
          setUser(storedUser);
        } else {
          // Both tokens expired
          removeTokens();
          setUser(null);
        }
      } else {
        // No tokens found
        removeTokens();
        setUser(null);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    removeTokens();
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