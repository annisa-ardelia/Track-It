const express = require('express');
const send = express.Router();
const NoteController = require("../repositories/note.js");

send.post("/getN",NoteController.getNotes);
send.post("/addN",NoteController.addNotes);

module.exports = send;