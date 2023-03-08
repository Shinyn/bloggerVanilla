const express = require("express");
const server = express();
const mysql = require("mysql2");
const joi = require("joi");

const config = {
  user: process.env.user,
  password: process.env.password,
  host: process.env.host,
  database: process.env.database,
};

const pool = mysql.createPool(config);

const form = document.querySelector(".addForm");

server.get("/", (req, res) => {
  console.log(req.query);
  res.status(200).send("Got request");
});

server.post("/register", (req, res) => {
  const { username, password } = req.body;
});

server.listen(5050);

// const proclaim = querySelector("#proclaim");

// function proclaim() {
//   console.log("proclaim");
// }
