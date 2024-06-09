const express = require('express');
const send = express.Router();
const NoteController = require("../repositories/repository.note.js");

// Route to get all notes
send.post("/getN", NoteController.getNotes);

// Route to add a new note
send.post("/addN", NoteController.addNotes);

// Route to get a specific note by ID
send.post("/getNbyId", NoteController.getNotesSpecific);

module.exports = send;