const express = require('express'); 
const bodyParser = require('body-parser'); 
const userRepo = require('./repositories/repository.user'); 
const taskRepo = require('./repositories/repository.task'); 
const petRepo = require('./repositories/repository.pet'); 

const port = 4000; 
const app = express(); 
 
app.use(bodyParser.json()); 
 
// Endpoint 

 
app.listen(port, () => { 
    console.log('Server is running and listening on port', port); 
});