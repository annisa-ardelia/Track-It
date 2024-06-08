const { pool } = require("../config/db.config.js");
const { v4: uuidv4 } = require('uuid');


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
    const { username, nickname, password, avatar } = req.body;
    try {
        const userCheck = await pool.query(
            'SELECT * FROM user_database WHERE username = $1 OR nickname = $2',
            [username, nickname]
        );

        if (userCheck.rows.length > 0) {
            return res.status(400).send("Username or nickname already exists");
        }

        await pool.query(
            "INSERT INTO user_database (username, nickname, password, avatar) VALUES ($1, $2, $3, $4)",
            [ username, nickname, password, avatar]
        );
        res.status(201).send("Sukses signup");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getNick = async function (req, res){ //function for get nickname, check UserRoutes
    const {username} = req.body;
    try {
        const Nick = await pool.query('SELECT nickname FROM user_database WHERE username = $1', [username]);
        
        if (Nick.rowCount === 0) {
            res.json({ nickname: username });
        } else {
            res.json({ nickname: Nick.rows[0].nickname });
        }
    } catch (error) {
        // Handle the error
        console.error(error);
        res.status(500).json({ error: 'Error retrieving nickname' });
    }
}

exports.getPoint = async function (req, res){
    const {username} = req.body;
    try {
        const Point = await pool.query('select point from user_database where username = $1', [username]);
        if (Point.rows.length === 0) {
            return res.status(404).json({ error: "Username don't exist not found"});
        }
        res.json(result.rows[0].point);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving point' });
    }
}

exports.updatePoint = async function (req, res){
    const {username} = req.body;

    try {
        const AddPoint = await pool.query("select * from user_task where username = $1 and status = 'Done;", [username]);
        const point = 0;
    } catch (error) {
        
    }
    
}

exports.getLevel = async function (req, res){
    const {username} = req.body;
    try {
        const Point = await pool.query('select level from user_database where username = $1', [username]);
        if (Point.rows.length === 0) {
            return res.status(404).json({ error: "Username don't exist not found"});
        }
        res.json(result.rows[0].level);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving point' });
    }
}

exports.incrementLevel = async function (req, res) {
    const { username } = req.body;
    try {
        // Get current user data
        const userResult = await pool.query('select * from user_database where username = $1', [username]);
        if (userResult.rows.length === 0) {
            return res.status(404).send("Username not found");
        }

        const user = userResult.rows[0];        
        // Update user level, reset points, and update points needed
        await pool.query(
            'update user_database set level = $1 where username = $2',
            [newLevel, username]
        );

        return res.status(200).send("User level incremented successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
