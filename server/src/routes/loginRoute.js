const express = require("express");
const { loginUser } = require("../controllers/loginUser");
const loginRoute = express.Router();

loginRoute.post("/", loginUser);

exports.loginRoute = loginRoute;
