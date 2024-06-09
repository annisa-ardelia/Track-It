// Import the pool instance from the database configuration file
const { pool } = require("../config/db.config.js");
// Import the uuid library for generating unique identifiers (not used in this code, but included for other parts of your application)
const { v4: uuidv4 } = require('uuid');

/**
 * User log in function.
 * 
 * This function handles an HTTP POST request for user login. It checks the username and password against the database.
 * If the username is not found, it returns a 404 status code with an error message.
 * If the password is incorrect, it returns a 401 status code with an error message.
 * If both are correct, it returns a 200 status code with a success message.
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
exports.login = async function (req, res) {
    const { username, password } = req.body;

    try {
        const result = await pool.query("SELECT * FROM user_database WHERE username = $1", [username]);

        if (result.rows.length === 0) {
            return res.status(404).send("Username tidak ditemukan");
        }

        const storedPassword = result.rows[0].password;

        if (password !== storedPassword) {
            return res.status(401).send("Password salah");
        }

        res.status(200).send("Login berhasil");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

/**
 * User sign up function.
 * 
 * This function handles an HTTP POST request for user sign up. It checks if the username already exists in the database.
 * If the username exists, it returns a 400 status code with an error message.
 * If the username does not exist, it inserts the new user data into the database and returns a 201 status code with a success message.
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
exports.signup = async function (req, res) {
    const { username, nickname, password, avatar } = req.body;

    try {
        console.log("Received data:", { username, nickname, password, avatar });

        const userCheck = await pool.query('SELECT * FROM user_database WHERE username = $1', [username]);

        if (userCheck.rows.length > 0) {
            return res.status(400).send("Username already exists");
        }

        await pool.query(
            "INSERT INTO user_database (username, nickname, password, avatar) VALUES ($1, $2, $3, $4)",
            [username, nickname, password, avatar]
        );

        res.status(201).send("Sukses signup");
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Internal Server Error");
    }
};

/**
 * Get user nickname function.
 * 
 * This function handles an HTTP POST request to get the nickname of a user based on the username.
 * If the username is found, it returns the nickname. If the username is not found, it returns the username as the nickname.
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
exports.getNick = async function (req, res) {
    const { username } = req.body;

    try {
        const Nick = await pool.query('SELECT nickname FROM user_database WHERE username = $1', [username]);

        if (Nick.rowCount === 0) {
            res.json({ nickname: username });
        } else {
            res.json({ nickname: Nick.rows[0].nickname });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving nickname' });
    }
};

/**
 * Get user points function.
 * 
 * This function handles an HTTP POST request to get the points of a user based on the username.
 * If the username is found, it returns the points. If the username is not found, it returns a 404 status code with an error message.
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
exports.getPoint = async function (req, res) {
    const { username } = req.body;
    try {
        const Point = await pool.query('SELECT point FROM user_database WHERE username = $1', [username]);
        if (Point.rows.length === 0) {
            return res.status(404).json({ error: "Username don't exist" });
        }
        res.json(Point.rows[0].point);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving point' });
    }
};

/**
 * Update user points function.
 * 
 * This function handles an HTTP POST request to update the points of a user based on the completed tasks.
 * It retrieves the user's current points and completed tasks, calculates the new total points, updates the user's points in the database,
 * and marks the tasks as counted. If successful, it returns a 200 status code with a success message.
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
exports.updatePoint = async function (req, res) {
    const { username } = req.body;

    try {
        // Retrieve current points of the user
        const userResult = await pool.query("SELECT point FROM user_database WHERE username = $1", [username]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: "Username not found" });
        }

        let totalPoints = userResult.rows[0].point;
        console.log(`Current points for ${username}: ${totalPoints}`);

        // Retrieve completed tasks that haven't been counted yet
        const taskResult = await pool.query("SELECT id, priority FROM user_task WHERE username = $1 AND status = 'Done' AND is_counted = FALSE", [username]);

        if (taskResult.rows.length === 0) {
            return res.status(404).json({ error: "No uncounted completed tasks found for the user" });
        }

        // Calculate additional points based on task priorities
        const taskIds = [];
        taskResult.rows.forEach(task => {
            console.log(`Task priority: ${task.priority}`);
            switch (task.priority) {
                case 'Urgent':
                    totalPoints += 3;
                    break;
                case 'Standard':
                    totalPoints += 2;
                    break;
                case 'Relax':
                    totalPoints += 1;
                    break;
                default:
                    break;
            }
            taskIds.push(task.id);
        });

        console.log(`New total points for ${username}: ${totalPoints}`);

        // Update user's points in the user_database table
        await pool.query("UPDATE user_database SET point = $1 WHERE username = $2", [totalPoints, username]);

        // Mark tasks as counted
        await pool.query("UPDATE user_task SET is_counted = TRUE WHERE id = ANY($1::int[])", [taskIds]);

        res.status(200).send("User points updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

/**
 * Get user level function.
 * 
 * This function handles an HTTP POST request to get the level of a user based on the username.
 * If the username is found, it returns the level. If the username is not found, it returns a 404 status code with an error message.
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
exports.getLevel = async function (req, res) {
    const { username } = req.body;

    try {
        const Point = await pool.query('SELECT level FROM user_database WHERE username = $1', [username]);
        if (Point.rows.length === 0) {
            return res.status(404).json({ error: "Username don't exist" });
        }
        res.json(Point.rows[0].level);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving level' });
    }
};

/**
 * Increment user level function.
 * 
 * This function handles an HTTP POST request to increment the level of a user based on their points.
 * It checks if the user has enough points to level up. If so, it increments the level and updates the points accordingly.
 * If successful, it returns a 200 status code with a success message. If not enough points, it returns a 200 status code with a message.
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
exports.incrementLevel = async function (req, res) {
    const { username } = req.body;

    try {
        // Get current user data
        const userResult = await pool.query('SELECT * FROM user_database WHERE username = $1', [username]);
        if (userResult.rows.length === 0) {
            return res.status(404).send("Username not found");
        }

        const user = userResult.rows[0];
        const currentLevel = user.level;
        const currentPoints = user.point;

        // Calculate the points required to level up
        const pointsRequired = currentLevel * currentLevel + currentLevel;

        if (currentPoints >= pointsRequired) {
            const newLevel = currentLevel + 1;
            const newPoints = currentPoints - pointsRequired;

            // Update user level and points in the database
            await pool.query(
                'UPDATE user_database SET level = $1, point = $2 WHERE username = $3',
                [newLevel, newPoints, username]
            );

            return res.status(200).send("User level incremented successfully");
        } else {
            return res.status(200).send("Not enough points to level up");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

/**
 * Get user profile function.
 * 
 * This function handles an HTTP POST request to get the profile of a user based on the username.
 * It retrieves the user's profile data from the database, including username, password, nickname, avatar, level, point, and level_up_point.
 * If the user is found, it returns the profile data. If the user is not found, it returns a 404 status code with an error message.
 * 
 * @param {object} req - The request object
 * @param {object} res - The response object
 */
exports.profile = async function (req, res) {
    const { username } = req.body;

    try {
        console.log("Received username:", username);

        const result = await pool.query(
            `SELECT 
            u.username,
            u.password,
            u.nickname,
            a.image AS avatar,
            u.level,
            u.point,
            u.level_up_point
            FROM user_database u
            JOIN user_avatar a
            ON u.avatar = a.id
            WHERE u.username = $1`, [username]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const userProfile = result.rows[0];
        res.status(200).json(userProfile);  // Send JSON response
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "Internal Server Error" });  // Send JSON response
    }
};