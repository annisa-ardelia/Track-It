// Import the pool instance from the database configuration file
const { pool } = require("../config/db.config.js");

// Import the uuid library for generating unique identifiers
const { v4: uuidv4 } = require('uuid');

/**
 * Add a new note.
 * 
 * This function handles an HTTP POST request to add a new note to the 'user_notes' table in the database.
 * It checks if a note with the same name already exists for the user. If it does, it returns a 404 status code
 * with an error message. Otherwise, it inserts the new note and returns a 201 status code with a success message.
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
exports.addNotes = async function (req, res) {
    const { name, username, text } = req.body;

    try {
        // Check if a note with the same name already exists
        const NoteCheck = await pool.query("SELECT * FROM user_notes WHERE name = $1", [name]);
        if (NoteCheck.rowCount > 0) {
            return res.status(404).send("Note Already Exist, Change Name");
        } else {
            // Insert the new note into the database
            await pool.query("INSERT INTO user_notes(name, username, notes) VALUES ($1, $2, $3)", [name, username, text]);
            res.status(201).send("Add Task Berhasil!");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

/**
 * Get all notes for a specific user.
 * 
 * This function handles an HTTP GET request to retrieve all notes for a specific user from the 'user_notes' table.
 * It sends the retrieved data as a JSON response. If an error occurs during the database query, it logs the error
 * and returns a 500 status code with an "Internal Server Error" message.
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
exports.getNotes = async function (req, res) {
    const { username } = req.body;

    try {
        // Retrieve all notes for the specified user
        const AllNotes = await pool.query("SELECT * FROM user_notes WHERE username = $1", [username]);
        res.json(AllNotes.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

/**
 * Get a specific note by id for a specific user.
 * 
 * This function handles an HTTP GET request to retrieve a specific note by its id for a specific user from the 'user_notes' table.
 * It sends the retrieved data as a JSON response. If an error occurs during the database query, it logs the error
 * and returns a 500 status code with an "Internal Server Error" message.
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
exports.getNotesSpecific = async function (req, res) {
    const { username, id } = req.body;

    try {
        // Retrieve the specific note for the specified user by id
        const AllNotes = await pool.query("SELECT * FROM user_notes WHERE username = $1 AND id = $2", [username, id]);
        res.json(AllNotes.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};