const express = require('express');
const send = express.Router();
const TaskController = require("../repositories/repository.task.js");

// Route to add a new task
send.post("/addT", TaskController.addTask);

// Route to get all tasks
send.post("/getT", TaskController.getTask);

// Route to delete a task by name
send.post("/delT", TaskController.delTask);

// Route to update task status to Overdue
send.post("/updT", TaskController.updateTask);

// Route to update task status to Done
send.post("/doneT", TaskController.doneTask);

// Route to update task status to In-Progress
send.post("/startT", TaskController.startTask);

module.exports = send;