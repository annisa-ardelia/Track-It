const express = require('express');
const send = express.Router();
const PetController = require("../repositories/repository.pet.js");

// Route to get owned pets
send.post("/getOwnedP", PetController.getOwnedPets);

// Route to get all pets not owned by the user
send.post("/getAllP", PetController.getAllPets);

// Route to get the newest pet owned by the user
send.post("/getNewP", PetController.getMyNewestPet);

// Route to update user's owned pets based on their level
send.post("/updateOwned", PetController.UpdateOwnedPet);

module.exports = send;