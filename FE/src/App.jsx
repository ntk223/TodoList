import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";


function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register setUser={setUser} />}
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
