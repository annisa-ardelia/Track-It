const { pool } = require("../config/db.config.js");
const { v4: uuidv4 } = require('uuid');

//Get all avatar images
exports.avatar = async function (req, res) {
    try {
        const AllAvatar = await pool.query("SELECT * FROM user_avatar");

        if (AllAvatar.rows.length === 0) {
            return res.status(202).json([]); // Return an empty array if no tasks
        } else {
            return res.json(AllAvatar.rows);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};