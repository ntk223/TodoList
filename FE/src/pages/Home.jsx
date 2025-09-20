import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import { getTasks, deleteTask, updateTask, addTask } from "../api/tasks";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import AddTask from "./AddTask.jsx";
import UserProfile from "./UserProfile.jsx";

import { changeProfile } from "../api/users.js";

export default function Home({ user, setUser, onLogout }) {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);      // lưu task từ backend
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(user);

    // example: tasks ban dau co gia tri [], setTasks de cap nhat tasks
    // gọi API khi component mount
  useEffect(() => {
    getTasks(user.id)
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [user.id]); // Update tasks whenever user.id changes or when returning to Home

  // hàm xóa task
  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  const handleUpdate = async (updatedTask) => {
    try {
      const data = await updateTask(updatedTask);
      setTasks(tasks.map((task) => (task.id === data.id ? data : task)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  const handleAddTask = async (task) => {
      try {
        const newTask = await addTask(task);
        console.log("Task added:", newTask);
        setTasks([...tasks, newTask]);
        navigate("/"); // sau khi thêm → quay về home

      } catch (error) {
        console.error("Error adding task:", error);
      }
    };
const handleChangeProfile = async (id, fields) => {
    try {
      const currentUser = await changeProfile(id, fields);
      localStorage.setItem("user", JSON.stringify(currentUser));
      setUser(currentUser); // ✅ update state từ App
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (loading) return <p>⏳ Đang tải...</p>;
  if (error) return <p>❌ Lỗi: {error}</p>;

  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<TaskList tasks={tasks} onDelete={handleDelete} onSave={handleUpdate} />} />
        <Route path="/add-task" element={<AddTask onAddTask={handleAddTask} />} />
        <Route path="/user-profile" element={<UserProfile user={user} onUpdateUser={handleChangeProfile} />} />
      </Routes>
      <button onClick={() => navigate("/add-task")}>Thêm công việc</button> <br />
      <button onClick={onLogout}>Đăng xuất</button>

    </div>
  );
}
