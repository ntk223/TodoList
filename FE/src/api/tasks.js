const API_URL = "http://localhost:5000";

export async function getTasks(userId) {
    const res = await fetch(`http://localhost:5000/tasks/${userId}`);
    if (!res.ok) throw new Error("Lỗi khi lấy tasks từ server");
    const data = await res.json();
    return data;
}

export async function addTask(task) {
  const res = await fetch(`${API_URL}/tasks`, { 
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Lỗi khi thêm task");
  return res.json();
}
