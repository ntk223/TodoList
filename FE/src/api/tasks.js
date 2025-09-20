import api from "./api.js";

export async function getTasks(userId) {
  try {
    const response = await api.get(`/tasks/${userId}`)
    return response.data
  } catch (error) {
    throw new Error("Loi lay task")
  }
}

// stringify: chuyển object/array thành chuỗi JSON
// parse: chuyển chuỗi JSON thành object/array
export async function addTask(task) {
  try {
    const response = await api.post('/tasks', task)    
    return response.data
  } catch (error) {
    throw new Error("Loi tao task")
  }
}

export async function deleteTask(taskId) {
  try {
    const response = await api.delete(`/tasks/${taskId}`)
    return response.data
  } catch (error) {
    throw new Error('Loi xoa task')
  }
}

function formatDueDate(date) {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}
export async function updateTask(task) {
  try {
    const response = await api.put(`tasks/${task.id}`, task)
    response.data.due_date = formatDueDate(task.due_date)
    return response.data
  } catch (error) {
    throw new Error("Loi update task")
  }
} 