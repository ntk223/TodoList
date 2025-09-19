import pool from "../config/database.js"; // chỗ bạn đã setup
import ApiError from '../utils/ApiError.js'

const login = async (email, password) => {
    const [row] = await pool.query(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password]
    );
    return row[0];
}

const getUserById = async (id) => {
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id])
    if (rows.length === 0) {
        throw new ApiError(404, "User not found");
    }
    return rows[0]
}

const changeProfile = async (id, fields) => {
    const key = Object.keys(fields);
    const values = Object.values(fields);
    const setString = key.map(k => `${k} = ?`).join(', ');
    const [result] = await pool.query(`UPDATE users SET ${setString} WHERE id = ?`, [...values, id]);
    if (result.affectedRows === 0) {
        throw new ApiError(404, "User not found");
    }
    const updatedUser = await getUserById(id);
    return updatedUser;
}
export const userModel = {
    login,
    changeProfile,
}