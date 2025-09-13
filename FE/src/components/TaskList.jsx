import TaskItem from "./TaskItem";

export default function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return <p className="text-gray-500">Chưa có task nào</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-lg shadow-md border-collapse">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border border-gray-300 px-4 py-2 text-left">#</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Priority</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Deadline</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <TaskItem key={task.id} task={task} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
