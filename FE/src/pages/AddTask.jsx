import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";

export default function AddTask({ onAddTask }) {
  const navigate = useNavigate();

  const handleAddTask = (task) => {
    onAddTask(task);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <TaskForm onSubmit={handleAddTask} />
    </div>
  );
}
