// Import the pool instance from the database configuration file
const { pool } = require("../config/db.config.js");

// Import the uuid library for generating unique identifiers
const { v4: uuidv4 } = require('uuid');

/**
 * Get all avatar images.
 * 
 * This function handles an HTTP GET request to retrieve all rows from the
 * 'user_avatar' table in the database. It sends the retrieved data as a JSON
 * response. If no rows are found, it returns an empty array with a 202 status code.
 * If an error occurs during the database query, it logs the error and returns
 * a 500 status code with an "Internal Server Error" message.
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
exports.avatar = async function (req, res) {
    try {
        // Execute the SQL query to select all rows from the 'user_avatar' table
        const AllAvatar = await pool.query("SELECT * FROM user_avatar");

        // Check if the query returned any rows
        if (AllAvatar.rows.length === 0) {
            return res.status(202).json([]); // Return an empty array if no rows found
        } else {
            return res.json(AllAvatar.rows); // Return the rows as JSON response
        }
    } catch (error) {
        // Log the error and send a 500 status code with an error message
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};