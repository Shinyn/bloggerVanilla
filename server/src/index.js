const express = require("express");
const server = express();
const { getDatabase } = require("./getDatabase.js");
const { createUser } = require("./createUser.js");

server.use(express.json());

server.get("/", getDatabase);

server.post("/createUser", createUser);

server.listen(5050);

// const proclaim = querySelector("#proclaim");
