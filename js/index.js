const express = require("express");
const server = express();
const dotenv = require("dotenv").config();
const mysql = require("mysql2");
const joi = require("joi");

server.use(express.json());

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.PORT,
};

const pool = mysql.createPool(config);

server.get("/", (req, res) => {
  console.log(req.query);
  res.status(200).send("Got request");
});

server.post("/pages/login.html", (req, res) => {
  const { username, password } = req.body;

  const schema = joi.object({
    username: joi.string().max(20).required(),
    password: joi.string().max(20).required(),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }

  const sql = `insert into users (username, password) values (?, ?)`;
  pool.execute(sql, [username, password], (error, result) => {
    if (error) {
      res.status(400).send(error);
      return;
    }
    res.status(200).send(result);
  });

  // res.status(200).send(`post is working like cray ${username} ${password}`);
});

server.listen(5050);

// const proclaim = querySelector("#proclaim");
