const express = require('express');
const send = express.Router();
const NoteController = require("../repositories/repository.note.js");

send.post("/getN",NoteController.getNotes);
send.post("/addN",NoteController.addNotes);
send.post("/getNbyId", NoteController.getNotesSpecific);

module.exports = send;