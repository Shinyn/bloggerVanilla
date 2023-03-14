const express = require("express");
const { registerUser } = require("../controllers/registerUser");
const registerRoute = express.Router();

registerRoute.post("/", registerUser);

exports.registerRoute = registerRoute;
