export default function TaskItem({ task }) {
  return (
    <li className="flex items-center justify-between border-b py-2">
      <span>{task.title}</span>
    </li>
  );
}
