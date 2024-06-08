const express = require('express');
const send = express.Router();
const PetController = require("../repositories/repository.pet.js");

send.post("/getOwnedP",PetController.getOwnedPets);
send.post("/getAllP",PetController.getAllPets);
send.post("/getNewP", PetController.getMyNewestPet);

module.exports = send;