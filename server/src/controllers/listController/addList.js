"use strict";
const joi = require("joi");
const { pool } = require("../../database");

exports.addList = async function addList(req, res) {
  const userID = req.loggedInUser.id;
  const { userInput } = req.body;

  const schema = joi.object({
    userInput: joi.string().min(1).max(50).required(),
  });
  const validation = schema.validate(req.body);

  if (validation.error) {
    res.status(400).json("Listname must be between 1 and 50 characters long");
    return;
  }

  const sql = `insert into todoList (userID, listName) values (?, ?)`;
  pool.execute(sql, [userID, userInput], (error, result) => {
    if (error) {
      res.status(500).json(error);
      return;
    }
    res.status(201).json("Created new todo-list");
  });
};
