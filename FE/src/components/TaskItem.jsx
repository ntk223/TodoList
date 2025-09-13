export default function TaskItem({ task, index }) {
  return (
    <tr className="hover:bg-gray-50">
        <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
        <td className="border border-gray-300 px-4 py-2">{task.title}</td>
        <td className="border border-gray-300 px-4 py-2">{task.description}</td>
        <td className="border border-gray-300 px-4 py-2">
          {task.completed ? (
            <span className="text-green-600 font-semibold">✅ Done</span>
          ) : (
            <span className="text-yellow-600 font-semibold">⏳ Pending</span>
          )}
        </td>
        <td className="border border-gray-300 px-4 py-2">{task.priority}</td>
        <td className="border border-gray-300 px-4 py-2">{task.due_date}</td>
    </tr>
  );
}
