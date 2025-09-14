import pool from "../config/database.js"; // chỗ bạn đã setup

const login = async (email, password) => {
    const [row] = await pool.query(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password]
    );
    return row[0];
}

const getUserById = async (id) => {
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id])
    return rows[0]
}

const changeProfile = async (id, fields) => {
    const key = Object.keys(fields);
    const values = Object.values(fields);
    const setString = key.map(k => `${k} = ?`).join(', ');
    const [result] = await pool.query(`UPDATE users SET ${setString} WHERE id = ?`, [...values, id]);
    const updatedUser = await getUserById(id);
    return updatedUser;
}
export const userModel = {
    login,
    changeProfile,
}