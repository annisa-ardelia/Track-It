const { pool } = require("../config/db.config.js");
const { v4: uuidv4 } = require('uuid');

//User log in function
exports.login = async function (req, res) {
    const { username, password } = req.body;

    try {
        const result = await pool.query("select * from user_database where username = $1", [username]);

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

// User sign up function
exports.signup = async function (req, res) {
    const { username, nickname, password, avatar } = req.body;

    try {
        // Log untuk memeriksa data input
        console.log("Received data:", { username, nickname, password, avatar});

        const userCheck = await pool.query(
            'SELECT * FROM user_database WHERE username = $1',
            [username]
        );

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

//Get user nickname
exports.getNick = async function (req, res){ //function for get nickname, check UserRoutes
    const {username} = req.body;

    try {
        const Nick = await pool.query('select nickname from user_database where username = $1', [username]);
        
        if (Nick.rowCount === 0) {
            res.json({ nickname: username });
        } else {
            res.json({ nickname: Nick.rows[0].nickname });
        }
    } catch (error) {
        // Handle the error
        console.error(error);
        res.status(500).json({ error: 'Error retrieving nickname' });
    }
};

//Get user points
exports.getPoint = async function (req, res){
    const {username} = req.body;
    try {
        const Point = await pool.query('select point from user_database where username = $1', [username]);
        if (Point.rows.length === 0) {
            return res.status(404).json({ error: "Username don't exist not found"});
        }
        res.json(Point.rows[0].point);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving point' });
    }
};

//Update user points
exports.updatePoint = async function (req, res) {
    const { username } = req.body;

    try {
        // Retrieve current points of the user
        const userResult = await pool.query("select point from user_database where username = $1", [username]);
        
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: "Username not found" });
        }

        let totalPoints = userResult.rows[0].point;
        console.log(`Current points for ${username}: ${totalPoints}`);

        // Retrieve completed tasks that haven't been counted yet
        const taskResult = await pool.query("select id, priority from user_task where username = $1 and status = 'Done' and is_counted = FALSE", [username]);
        
        if (taskResult.rows.length === 0) {
            return res.status(404).json({ error: "No uncounted completed tasks found for the user" });
        }

        // Calculate additional points based on task priorities
        const taskIds = [];
        taskResult.rows.forEach(task => {
            console.log(`Task priority: ${task.priority}`);
            switch(task.priority) {
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
        await pool.query("update user_database set point = $1 where username = $2", [totalPoints, username]);

        // Mark tasks as counted
        await pool.query("update user_task SET is_counted = TRUE where id = ANY($1::int[])", [taskIds]);

        res.status(200).send("User points updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

//Get user level
exports.getLevel = async function (req, res){
    const {username} = req.body;

    try {
        const Point = await pool.query('select level from user_database where username = $1', [username]);
        if (Point.rows.length === 0) {
            return res.status(404).json({ error: "Username don't exist not found"});
        }
        res.json(Point.rows[0].level);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving point' });
    }
};

//Update user level by incrementing it
exports.incrementLevel = async function (req, res) {
    const { username } = req.body;

    try {
        // Get current user data
        const userResult = await pool.query('select * from user_database where username = $1', [username]);
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
                'update user_database set level = $1, point = $2 where username = $3',
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

//Get user profile 
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