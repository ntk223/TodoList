import { useState } from "react";

export default function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      priority,
      due_date: deadline,
      completed: false,
      user_id: JSON.parse(localStorage.getItem("user")).id,
    });

    // reset form sau khi submit
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDeadline("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-96"
    >
      <h2 className="text-xl font-bold mb-4">Thêm Task mới</h2>

      <input
        type="text"
        placeholder="Tiêu đề"
        className="w-full border p-2 rounded mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Mô tả"
        className="w-full border p-2 rounded mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <select
        className="w-full border p-2 rounded mb-2"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="date"
        className="w-full border p-2 rounded mb-2"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        ➕ Thêm
      </button>
    </form>
  );
}
