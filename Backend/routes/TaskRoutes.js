const express = require('express');
const send = express.Router();
const TaskController = require("../repositories/task.js");

send.post("/addT", TaskController.addTask);
send.post("/getT", TaskController.getTask);
send.post("/delT", TaskController.delTask);

module.exports = send;