const express = require('express'); 
const bodyParser = require('body-parser'); 
const userRoutes = require('./routes/UserRoutes'); 
const TaskRoutes = require('./routes/TaskRoutes');
const NoteRoutes = require('./routes/NoteRoutes');
const PetRoutes = require('./routes/PetRoutes');
const {pool} = require('./config/db.config');
const port = process.env.PORT; 
const app = express(); 
const cors = require('cors');


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/user', userRoutes); //connect /user to all user - centric backend
app.use('/task', TaskRoutes); //connect /task to all task - centric backend
app.use('/note', NoteRoutes); //connect /note to all note - centric backend
app.use('/pet', PetRoutes); //connect /pet to all pet - centric backend


pool.connect(() => {
    console.log("Connected to database");
});

app.listen(port, () => { 
    console.log('Server is running and listening on port', port); 
});