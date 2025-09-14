import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onSave, onDelete }) {
  if (tasks.length === 0) {
    return <p className="text-gray-500">Chưa có task nào</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-lg shadow-md border-collapse">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Priority</th>
            <th className="border border-gray-300 px-4 py-2">Deadline</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              index={index}
              onSave={onSave}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
