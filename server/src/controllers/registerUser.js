const joi = require("joi");
const { pool } = require("../database");
const bcrypt = require("bcrypt");

exports.registerUser = function registerUser(req, res) {
  const { username, password } = req.body;

  const schema = joi.object({
    username: joi.string().min(3).max(20).required(),
    password: joi.string().min(3).max(20).required(),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    res.status(400).json(validation.error.details[0].message);
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const sql = `insert into users (username, password) values (?, ?)`;
  pool.execute(sql, [username, hashedPassword], (error, result) => {
    if (error && error.code === "ER_DUP_ENTRY") {
      res.status(400).json("That username is taken, pick another one");
      return;
    }
    if (error) {
      res.status(500).json(error);
      return;
    }
    res.status(201).json("Account created");
  });
};
