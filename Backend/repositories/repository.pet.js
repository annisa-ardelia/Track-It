const { pool } = require("../config/db.config.js");

const getOwnedPets = async (req, res) => {
    const { username } = req.body;

    try {
        const result = await pool.query(
            `SELECT po.username, p.name, p.pet_avatar
            FROM pet_owner po
            JOIN pet p ON po.pet_id = p.id
            WHERE po.username = $1;`,
            [username]
        );

        if (result.rows.length === 0) {
            res.status(404).send("You don't have any pet yet");
        } else {
            res.send(result.rows);
        }
    } catch (error) {
        res.status(500).send({
            err: error.message,
        });
    }
};
const getAllPets = async (req, res) => { 
    const { username } = req.body;

    try { 
        const result = await pool.query( 
            `SELECT p.id, p.name, p.pet_avatar
            FROM pet p
            LEFT JOIN pet_owner po ON p.id = po.pet_id AND po.username = $1
            WHERE po.username IS NULL
            ORDER BY p.name ASC;`,
            [username]
        ); 

        if (result.rows.length === 0) { 
            res.status(404).send("No pets found"); 
        } else { 
            res.send(result.rows); 
        } 
    } catch (error) { 
        res.status(500).send({ 
            err: error.message, 
        }); 
    } 
};

const getMyNewestPet = async (req, res) => { 
    const { username } = req.body;

    try { 
        const result = await pool.query( 
            `SELECT po.username, p.name, p.pet_avatar, p.minimum_level
            FROM pet_owner po
            JOIN pet p ON po.pet_id = p.id
            WHERE username = $1
            ORDER BY po.ctid DESC
            LIMIT 1;`,
            [username]
        ); 

        if (result.rows.length === 0) { 
            res.status(404).send("No pets found"); 
        } else { 
            res.send(result.rows); 
        } 
    } catch (error) { 
        res.status(500).send({ 
            err: error.message, 
        }); 
    } 
};

module.exports = { 
    getAllPets,
    getOwnedPets,
    getMyNewestPet,
};