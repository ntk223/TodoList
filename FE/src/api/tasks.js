const API_URL = "http://localhost:5000";

export async function getTasks(userId) {
    const res = await fetch(`${API_URL}/tasks/${userId}`);
    if (!res.ok) throw new Error("Lỗi khi lấy tasks từ server");
    const data = await res.json();
    return data;
}

// stringify: chuyển object/array thành chuỗi JSON
// parse: chuyển chuỗi JSON thành object/array
export async function addTask(task) {
  const res = await fetch(`${API_URL}/tasks`, { 
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Lỗi khi thêm task");
  return res.json();
}

export async function deleteTask(taskId) {
  const res = await fetch(`${API_URL}/tasks/${taskId}`, { 
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Lỗi khi xóa task");
  return res.json();
}

export async function updateTask(task) {
  const res = await fetch(`${API_URL}/tasks/${task.id}`, { 
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Lỗi khi cập nhật task");
  // console.log(res.json());
  
  return res.json();
} 