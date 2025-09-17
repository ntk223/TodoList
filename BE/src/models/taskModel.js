import pool from '../config/database.js';

function toMySQLDatetime(isoString) {
  return new Date(isoString).toISOString().slice(0, 19).replace('T', ' ');
}

const getAllTasks = async () => {
    const [rows] = await pool.query('SELECT * FROM tasks');
    return rows;
}

const getTaskByUserId = async (userId) => {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE user_id = ?', [userId]);
    return rows;
}

const getTaskById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows[0];
}

const createTask = async (task) => {
    try {
        const [result] = await pool.query('INSERT INTO tasks (title, description, priority, due_date, user_id) VALUES (?, ?, ?, ?, ?)', 
                                [task.title, task.description, task.priority, task.due_date, task.user_id]);
        return { id: result.insertId, ...task };
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}


// bug
const updateTask = async (id, fields) => {
    console.log(fields);
    fields.due_date = toMySQLDatetime(fields.due_date);
    fields.created_at = toMySQLDatetime(fields.created_at);
    fields.updated_at = toMySQLDatetime(new Date().toISOString());
    // fields.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    // fields.created_at = new Date(fields.created_at).toISOString().slice(0, 19).replace('T', ' ');


    const key = Object.keys(fields);
    const values = Object.values(fields);
    const setString = key.map(k => `${k} = ?`).join(', ');
    const [result] = await pool.query(`UPDATE tasks SET ${setString} WHERE id = ?`, [...values, id]);
    const updatedTask = await getTaskById(id);
    return updatedTask;

    // return result.affectedRows > 0;
}

const deleteTask = async (id) => {
    const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    return result.affectedRows > 0;
}

export const taskModel = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskByUserId,
}