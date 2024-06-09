const express = require('express');
const { pool } = require('./config/db.config');
const cors = require('cors');

// Body parser for parsing JSON and URL-encoded request bodies
const bodyParser = require('body-parser');

// Importing route modules
const userRoutes = require('./routes/UserRoutes');
const TaskRoutes = require('./routes/TaskRoutes');
const NoteRoutes = require('./routes/NoteRoutes');
const PetRoutes = require('./routes/PetRoutes');
const AvatarRoutes = require('./routes/AvatarRoutes');

// Port configuration
const port = process.env.PORT;

// Initialize express application
const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Route middleware

// Routes for user-centric backend
app.use('/user', userRoutes);

// Routes for task-centric backend
app.use('/task', TaskRoutes);

// Routes for note-centric backend
app.use('/note', NoteRoutes);

// Routes for pet-centric backend
app.use('/pet', PetRoutes);

// Routes for avatar-centric backend
app.use('/avatar', AvatarRoutes);

// Connect to the database
pool.connect(() => {
    console.log("Connected to database");
});

// Start the server
app.listen(port, () => {
    console.log('Server is running and listening on port', port);
});