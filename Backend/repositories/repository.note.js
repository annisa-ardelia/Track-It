const { pool } = require("../config/db.config.js");
const { v4: uuidv4 } = require('uuid');

//Add a new notes function
exports.addNotes = async function (req, res){
    const {name, username, text} = req.body;

    try {
        const NoteCheck = await pool.query("Select * from user_notes where name = $1", [name]);
        if(NoteCheck.rowCount > 0 ){
            return res.status(404).send("Note Already Exist, Change Name");
        }
        else {
            await pool.query("Insert into user_notes(name, username, notes) values ($1, $2, $3)",
            [name, username, text]);
            res.status(201).send("Add Task Berhasil !");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

//Get all notes function
exports.getNotes = async function (req, res){
    const {username} = req.body;

    try {
        const AllNotes = await pool.query("SELECT * from user_notes notes where notes.username = $1 ", [username]);
        /*if (AllNotes.rows.length == 0){
            return res.json(Allnotes.rows);

        }*/ //In FrontEnd, Implement to check The Notes
        res.json(AllNotes.rows);
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

//Get a specific note by id
exports.getNotesSpecific = async function (req, res){
    const {username, id } = req.body;

    try {
        const AllNotes = await pool.query("SELECT * from user_notes notes where username = $1 AND id = $2 ", [username, id ]);
        /*if (AllNotes.rows.length == 0){
            return res.json(Allnotes.rows);

        }*/ //In FrontEnd, Implement to check The Notes
        res.json(AllNotes.rows);
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};