import pool from "../config/database.js"; // chỗ bạn đã setup

const login = async (email, password) => {
    const [row] = await pool.query(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password]
    );
    return row[0];
}
export const userModel = {
    login,
}