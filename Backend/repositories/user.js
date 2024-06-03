const { pool } = require("../config/db.config.js");
const { v4: uuidv4 } = require('uuid');

// Fungsi untuk login
exports.login = async function (req, res) {
    const { username, password } = req.body;
    try {
        const result = await pool.query("SELECT * FROM user_database WHERE username = $1", [username]);

        if (result.rows.length === 0) {
            return res.status(404).send("Username tidak ditemukan");
        }

        const storedPassword = result.rows[0].password;

        if (password !== storedPassword) {
            return res.status(401).send("Password salah");
        }

        res.status(200).send("Login berhasil");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

// Fungsi untuk signup
exports.signup = async function (req, res) {
    const { username, email, password } = req.body;
    try {
        const userCheck = await pool.query(
            'SELECT * FROM user_database WHERE username = $1 OR email = $2',
            [username, email]
        );

        if (userCheck.rows.length > 0) {
            return res.status(400).send("Username or Email already exists");
        }

        await pool.query(
            "INSERT INTO user_database (user_id, username, email, password) VALUES ($1, $2, $3, $4)",
            [uuidv4(), username, email, password]
        );
        res.status(201).send("Sukses signup");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};
