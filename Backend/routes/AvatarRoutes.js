const express = require('express');
const send = express.Router();
const AvatarController = require("../repositories/repository.avatar.js");

// Define the route for fetching avatars
send.get("/pict", AvatarController.avatar);

module.exports = send;