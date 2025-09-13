import pool from '../config/database.js';

const getAllTasks = async () => {
    const [rows] = await pool.query('SELECT * FROM tasks');
    return rows;
}

const getTaskByUserId = async (userId) => {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE user_id = ?', [userId]);
    return rows;
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

const updateTask = async (id, fields) => {
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