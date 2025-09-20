import pool from "../config/database.js"
import ApiError from '../utils/ApiError.js'
import bcrypt from 'bcrypt';

const register = async (email, password, username) => {
    const [existingUser] = await pool.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );
    if (existingUser.length > 0) {
        throw new ApiError(400, "Email already in use");
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const [result] = await pool.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
    );
    return { id: result.insertId, email, username };
}

const login = async (email, password) => {
    const [row] = await pool.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );
    if (row.length === 0) {
        throw new ApiError(404, "User not found");
    }
    const user = row[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }
    return user;
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
    register,
}