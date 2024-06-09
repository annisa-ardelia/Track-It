// Import the pool instance from the database configuration file
const { pool } = require("../config/db.config.js");

// Import the uuid library for generating unique identifiers (not used in this code, but included for other parts of your application)
const { v4: uuidv4 } = require('uuid');

/**
 * Add a new task.
 * 
 * This function handles an HTTP POST request to add a new task for a user. 
 * It first checks if a task with the same name already exists for the user. 
 * If it exists, it returns a 404 status code with an error message. 
 * If it does not exist, it inserts the new task into the database and returns a 201 status code with a success message.
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
exports.addTask = async function (req, res) {
    const { username, name, category, status, deadline, priority, note } = req.body;

    try {
        // Check if the task already exists
        const TaskCheck = await pool.query("SELECT * FROM user_task WHERE name = $1", [name]);
        if (TaskCheck.rowCount > 0) {
            return res.status(404).send("Task Already Exist");
        }

        // Insert the new task into the database
        await pool.query("INSERT INTO user_task (username, name, category, status, deadline, priority, note) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [username, name, category, status, deadline, priority, note]);
        res.status(201).send("Add Task Berhasil !");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

/**
 * Get all tasks for a user.
 * 
 * This function handles an HTTP GET request to retrieve all tasks for a specific user.
 * It orders the tasks by deadline and status. If no tasks are found, it returns an empty array.
 * If an error occurs during the database query, it logs the error and returns a 500 status code with an error message.
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
exports.getTask = async function (req, res) {
    const { username } = req.body;

    try {
        // Retrieve all tasks for the specified user, ordered by deadline and status
        const AllTask = await pool.query(
            "SELECT * FROM user_task WHERE username = $1 ORDER BY deadline ASC, CASE WHEN status = 'In-progress' THEN 1 WHEN status = 'Completed' THEN 2 WHEN status = 'Done' THEN 3 WHEN status = 'Overdue' THEN 4 ELSE 5 END",
            [username]
        );

        // Check if any tasks are found
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

/**
 * Delete a task by name.
 * 
 * This function handles an HTTP DELETE request to delete a task by its name.
 * If the task is successfully deleted, it returns a 201 status code with a success message.
 * If the task does not exist, it returns a 404 status code with an error message.
 * If an error occurs during the database query, it logs the error and returns a 500 status code with an error message.
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
exports.delTask = async function (req, res) {
    const { name } = req.body;

    try {
        // Delete the task with the specified name
        const DeleteNote = await pool.query("DELETE FROM user_task WHERE name = $1", [name]);
        if (DeleteNote.rowCount > 0) {
            res.status(201).send("Task Deleted Successfully !");
        } else {
            res.status(404).send("Task doesn't exist");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

/**
 * Update task status to 'Overdue'.
 * 
 * This function handles an HTTP PUT request to update the status of a task to 'Overdue'.
 * If the task is successfully updated, it returns a 200 status code with a success message.
 * If the task does not exist, it returns a 404 status code with an error message.
 * If an error occurs during the database query, it logs the error and returns a 500 status code with an error message.
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
exports.updateTask = async function (req, res) {
    const { username, name } = req.body;

    try {
        // Check if the task exists
        const TaskCheck = await pool.query("SELECT * FROM user_task WHERE username = $1 AND name = $2", [username, name]);
        if (TaskCheck.rowCount === 0) {
            return res.status(404).send("Task not found");
        }

        // Update the status of the task to 'Overdue'
        await pool.query("UPDATE user_task SET status = 'Overdue' WHERE username = $1 AND name = $2", [username, name]);
        res.status(200).send("Task category updated to Overdue");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

/**
 * Update task status to 'Done'.
 * 
 * This function handles an HTTP PUT request to update the status of a task to 'Done'.
 * If the task is successfully updated, it returns a 200 status code with a success message.
 * If the task does not exist, it returns a 404 status code with an error message.
 * If an error occurs during the database query, it logs the error and returns a 500 status code with an error message.
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
exports.doneTask = async function (req, res) {
    const { username, name } = req.body;

    try {
        // Check if the task exists
        const TaskCheck = await pool.query("SELECT * FROM user_task WHERE username = $1 AND name = $2", [username, name]);
        if (TaskCheck.rowCount === 0) {
            return res.status(404).send("Task not found");
        }

        // Update the status of the task to 'Done'
        await pool.query("UPDATE user_task SET status = 'Done' WHERE username = $1 AND name = $2", [username, name]);
        res.status(200).send("Task status updated to Done");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

/**
 * Update task status to 'In-progress'.
 * 
 * This function handles an HTTP PUT request to update the status of a task to 'In-progress'.
 * If the task is successfully updated, it returns a 200 status code with a success message.
 * If the task does not exist, it returns a 404 status code with an error message.
 * If an error occurs during the database query, it logs the error and returns a 500 status code with an error message.
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
exports.startTask = async function (req, res) {
    const { username, name } = req.body;

    try {
        // Check if the task exists
        const TaskCheck = await pool.query("SELECT * FROM user_task WHERE username = $1 AND name = $2", [username, name]);
        if (TaskCheck.rowCount === 0) {
            return res.status(404).send("Task not found");
        }

        // Update the status of the task to 'In-progress'
        await pool.query("UPDATE user_task SET status = 'In-progress' WHERE username = $1 AND name = $2", [username, name]);
        res.status(200).send("Task status updated to In-progress");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};