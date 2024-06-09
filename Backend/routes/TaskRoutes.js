const express = require('express');
const send = express.Router();
const TaskController = require("../repositories/repository.task.js");

send.post("/addT", TaskController.addTask);
send.post("/getT", TaskController.getTask);
send.post("/delT", TaskController.delTask);
send.post("/updT", TaskController.updateTask);
send.post("/doneT", TaskController.doneTask);
send.post("/startT", TaskController.startTask);

module.exports = send;