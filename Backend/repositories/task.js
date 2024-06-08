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
        const AllTask = await pool.query(
            "select * from user_task where username = $1 order by deadline ASC",
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

//update status to overdue
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
}

//update status to Done
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
}

//update status to In-Progress
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
}