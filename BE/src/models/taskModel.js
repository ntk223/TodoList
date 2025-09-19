import pool from '../config/database.js';
import toMySQLDatetime from '../utils/formatDate.js';
import ApiError from '../utils/ApiError.js';
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
    if (rows.length === 0) {
        throw new ApiError(404, `Task with ID: ${id} not found.`);
    }
    return rows[0];
}

const createTask = async (task) => {

    const [result] = await pool.query('INSERT INTO tasks (title, description, priority, due_date, user_id) VALUES (?, ?, ?, ?, ?)', 
                            [task.title, task.description, task.priority, task.due_date, task.user_id]);
    if (!result) {
        throw new ApiError(500, 'Failed to create task.');
    }
    return { id: result.insertId, ...task };

}


// bug
const updateTask = async (id, fields) => {
    // console.log(fields);
    if (fields.due_date) fields.due_date = toMySQLDatetime(fields.due_date);
    if (fields.created_at) fields.created_at = toMySQLDatetime(fields.created_at);
    if (fields.updated_at) fields.updated_at = toMySQLDatetime(new Date().toISOString());

    const key = Object.keys(fields);
    const values = Object.values(fields);
    const setString = key.map(k => `${k} = ?`).join(', ');
    const [result] = await pool.query(`UPDATE tasks SET ${setString} WHERE id = ?`, [...values, id]);
    const updatedTask = await getTaskById(id);
    if (!updatedTask) {
        throw new ApiError(404, `Task with ID: ${id} not found.`);
    }
    return updatedTask;

    // return result.affectedRows > 0;
}

const deleteTask = async (id) => {
    const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
        throw new ApiError(404, `Task with ID: ${id} not found.`);
    }
    return result.affectedRows > 0;
}

export const taskModel = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskByUserId,
}