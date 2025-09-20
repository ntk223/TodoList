import { useState } from "react";

export default function TaskItem({ task, index, onSave, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(editedTask);
    setIsEditing(false);
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="border border-gray-300 px-4 py-2">{index + 1}</td>

      {/* Title */}
      <td className="border border-gray-300 px-4 py-2">
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className="border p-1 rounded w-full"
          />
        ) : (
          task.title
        )}
      </td>

      {/* Description */}
      <td className="border border-gray-300 px-4 py-2">
        {isEditing ? (
          <input
            type="text"
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="border p-1 rounded w-full"
          />
        ) : (
          task.description
        )}
      </td>

      {/* Status */}
      <td className="border border-gray-300 px-4 py-2">
        {isEditing ? (
          <select
            name="completed"
            value={editedTask.completed}
            onChange={(e) =>
              setEditedTask({ ...editedTask, completed: e.target.value === "true" })
            }
            className="border p-1 rounded w-full"
          >
            <option value="false">⏳ Pending</option>
            <option value="true">✅ Done</option>
          </select>
        ) : task.completed ? (
          <span className="text-green-600 font-semibold">✅ Done</span>
        ) : (
          <span className="text-yellow-600 font-semibold">⏳ Pending</span>
        )}
      </td>

      {/* Priority */}
      <td className="border border-gray-300 px-4 py-2">
        {isEditing ? (
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleChange}
            className="border p-1 rounded w-full"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        ) : (
          task.priority
        )}
      </td>

      {/* Deadline */}
      <td className="border border-gray-300 px-4 py-2">
        {isEditing ? (
          <input
            type="date"
            name="due_date"
            value={editedTask.due_date ? editedTask.due_date.split("T")[0] : ""}
            onChange={handleChange}
            className="border p-1 rounded w-full"
          />
        ) : (
          task.due_date
        )}
      </td>

      {/* Actions */}
      <td className="border border-gray-300 px-4 py-2 flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
