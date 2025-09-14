import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import AddTask from "./pages/AddTask.jsx";
import { addTask } from "./api/tasks.js";
import Navbar from "./components/Navbar.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import { changeProfile } from "./api/users.js";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  console.log(user);
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  
  const handleAddTask = async (task) => {
    try {
      const newTask = await addTask(task);
      console.log("Task added:", newTask);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  const handleChangeProfile = async (id, fields) => {
    try {
      const updatedUser = await changeProfile(id, fields);
      console.log("User updated:", updatedUser);
      // Cập nhật user trong localStorage và state
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };



  return (
    <Router>
      <Navbar />
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
        <Route
          path="/user-profile"
          element={
            user ? (
              <UserProfile user={user} onUpdateUser={handleChangeProfile} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
          
        
        <Route
          path="/add-task"
          element={
            user ? (
              <AddTask onAddTask={handleAddTask} />
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
