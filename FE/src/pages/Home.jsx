import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import { getTasks } from "../api/tasks";
import { useNavigate } from "react-router-dom";

export default function Home({ user, onLogout }) {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);      // lưu task từ backend
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  }, []);

  if (loading) return <p>⏳ Đang tải...</p>;
  if (error) return <p>❌ Lỗi: {error}</p>;

  return (
    <div className="">
      <div>
        <h1 className="text-2xl font-bold mb-4">Danh sách Task</h1>
        <TaskList tasks={tasks} />
      </div>        
      <button
          onClick={() => navigate("/add-task")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          ➕ Thêm Task
      </button>
      <button
        onClick={onLogout}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Đăng xuất
      </button>

    </div>

    

    
  );
}
