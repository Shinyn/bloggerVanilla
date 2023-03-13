const express = require("express");
const server = express();
const cors = require("cors");
const { getDatabase } = require("./getDatabase.js");
const { createUser } = require("./createUser.js");

server.use(express.json());
server.use(cors());

server.get("/", getDatabase);

server.post("/createUser", createUser);

server.post("/login", (req, res) => {
  const { username, password } = req.body;
  //   const foundUser =
});

server.listen(5050);

// const proclaim = querySelector("#proclaim");
