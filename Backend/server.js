const express = require('express'); 
const bodyParser = require('body-parser'); 
const userRoutes = require('./routes/UserRoutes'); 
const {pool} = require('./config/db.config');
const port = process.env.PORT; 
const app = express(); 
const cors = require('cors');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/user', userRoutes);

pool.connect(() => {
    console.log("Connected to database");
});

app.listen(port, () => { 
    console.log('Server is running and listening on port', port); 
});