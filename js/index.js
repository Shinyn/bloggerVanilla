const express = require("express");
const server = express();
const dotenv = require("dotenv").config();
const mysql = require("mysql2");
const joi = require("joi");

server.use(express.json());

const config = {
  user: process.env.user,
  password: process.env.password,
  host: process.env.host,
  database: process.env.database,
};

const pool = mysql.createPool(config);

server.get("/", (req, res) => {
  console.log(req.query);
  res.status(200).send("Got request");
});

server.post("/register", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body, "hellooooOo");
  const schema = joi.object({
    username: joi.string().max(20).required(),
    password: joi.string().max(20).required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }

  res.status(200).send(`post is working like cray ${username} ${password}`);
  //   pool.
});

server.listen(5050);

// const proclaim = querySelector("#proclaim");
