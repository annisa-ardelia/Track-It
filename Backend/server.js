const express = require('express'); 
const bodyParser = require('body-parser'); 
const userRepo = require('./repositories/repository.user'); 
const taskRepo = require('./repositories/repository.task'); 
const petRepo = require('./repositories/repository.pet'); 

const port = 4000; 
const app = express(); 
const cors = require('cors');

app.use(bodyParser.json()); 
app.use(cors());

app.post('/api/signup', async (req, res) => { 
    const { username, password, email } = req.body; 
    const user = await userRepo.createUser(username, password, email); 
    if (user) { 
        res.json({ message: 'User created' }); 
    } else { 
        res.json({ message: 'User not created' }); 
    } 
});

app.post('/api/login', async (req, res) => { 
    const { username, password } = req.body; 
    const user = await userRepo.getUser(username, password); 
    if (user) { 
        res.json({ message: 'Login successful' }); 
    } else { 
        res.json({ message: 'Login failed' }); 
    } 
});
// Endpoint 

 
app.listen(port, () => { 
    console.log('Server is running and listening on port', port); 
});