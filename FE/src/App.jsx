import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  console.log(user);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* Nếu đã login, redirect từ /login → /home */}
        <Route
          path="/login"
          element={user ? <Navigate to="/home" /> : <Login setUser={setUser} />}
        />

        {/* Chỉ cho phép vào Home nếu đã login */}
        <Route
          path="/home"
          element={
            user ? (
              <Home user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Redirect tất cả các path khác về /login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
