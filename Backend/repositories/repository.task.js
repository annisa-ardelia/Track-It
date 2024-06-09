const { pool } = require("../config/db.config.js");
const { v4: uuidv4 } = require('uuid');

//Add a new task function
exports.addTask = async function (req, res){
    const { username, name, category, status, deadline, priority, note } = req.body;

    try {
        const TaskCheck = await pool.query("Select * from user_task where name = $1", [name]);
        if (TaskCheck.rowCount > 0){
            return res.status(404).send("Task Already Exist");
        }
        await pool.query("insert into user_task (username, name, category, status, deadline, priority, note) values ($1,$2, $3, $4,$5, $6, $7) ",
        [username, name, category, status, deadline, priority, note]);
        res.status(201).send("Add Task Berhasil !");
    }
    catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

// Get all task function
exports.getTask = async function (req, res) {
    const { username } = req.body;

    try {
        const AllTask = await pool.query(
            "SELECT * FROM user_task WHERE username = $1 ORDER BY deadline ASC, CASE WHEN status = 'In-progress' THEN 1 WHEN status = 'Completed' THEN 2 WHEN status = 'Done' THEN 3 WHEN status = 'Overdue' THEN 4 ELSE 5 END",
            [username]
        );
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

//Delete a task by name
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
};

//Update task status to Overdue
exports.updateTask = async function (req, res) {
    const { username, name } = req.body;

    try {
        const TaskCheck = await pool.query("select * from user_task where username = $1 and name = $2", [username, name]);
        if (TaskCheck.rowCount === 0) {
            return res.status(404).send("Task not found");
        }
        await pool.query("update user_task SET status = 'Overdue' where username = $1 AND name = $2", [username, name]);
        res.status(200).send("Task category updated to Overdue");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

//Update task status to Done
exports.doneTask = async function (req, res) {
    const { username, name } = req.body;

    try {
        const TaskCheck = await pool.query("select * from user_task where username = $1 AND name = $2", [username, name]);
        if (TaskCheck.rowCount === 0) {
            return res.status(404).send("Task not found");
        }
        await pool.query("update user_task set status = 'Done' where username = $1 AND name = $2", [username, name]);
        res.status(200).send("Task category updated to Overdue");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

//Update status to In-Progress
exports.startTask = async function (req, res) {
    const { username, name } = req.body;

    try {
        const TaskCheck = await pool.query("select * from user_task where username = $1 AND name = $2", [username, name]);
        if (TaskCheck.rowCount === 0) {
            return res.status(404).send("Task not found");
        }
        await pool.query("update user_task set status = 'In-progress' where username = $1 AND name = $2", [username, name]);
        res.status(200).send("Task category updated to Overdue");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};