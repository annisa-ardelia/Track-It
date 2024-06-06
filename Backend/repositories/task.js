const { pool } = require("../config/db.config.js");
const { v4: uuidv4 } = require('uuid');

// add Task Function
exports.addTask = async function (req, res){
    const { username, name, category, status, deadline, priority, note } = req.body;
    try {
        const TaskCheck = await pool.query("Select * FROM user_task where name = $1", [name]);
        if (TaskCheck.rowCount > 0){
            return res.status(404).send("Task Already Exist");
        }
        await pool.query("INSERT INTO user_task (username, name, category, status, deadline, priority, note) VALUES ($1,$2, $3, $4,$5, $6, $7) ",
        [username, name, category, status, deadline, priority, note]);
        res.status(201).send("Add Task Berhasil !");
    }
    catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

// get all Task Function
exports.getTask = async function (req, res) {
    const { username } = req.body;
    try {
        const AllTask = await pool.query("SELECT task.* FROM user_task task JOIN user_database ud ON task.username = ud.username WHERE task.username = $1", [username]);

        if (AllTask.rows.length === 0) {
            return res.status(202).json([]); // Return an empty array if no tasks
        } else {
            return res.json(AllTask.rows);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};


exports.delTask = async function (req, res){
    const  {name} = req.body;

    try {
        const DeleteNote = await pool.query("Delete from user_task where name = $1", [name]);
        if (DeleteNote.rowCount > 0){
            res.status(201).send("Task Deleted Succesfully ! ");
        }
        else {
            res.status(404).send(" Task doesn't exist");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}