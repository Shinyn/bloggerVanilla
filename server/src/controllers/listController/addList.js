"use strict";
const joi = require("joi");
const { pool } = require("../../database");

exports.addList = async function addList(req, res) {
  console.log("addList");
  const userID = req.loggedInUser.id;
  const { userInput } = req.body;

  const schema = joi.object({
    userInput: joi.string().min(1).required(),
  });
  const validation = schema.validate(req.body);

  if (validation.error) {
    res.status(411).send(validation.error.details[0].message);
    return;
  }

  const sql = `insert into todoList (userID, listName) values (?, ?)`;
  pool.execute(sql, [userID, userInput], (error, result) => {
    if (error) {
      res.status(400).send(error);
      return;
    }
    res.status(201).send("Created new todo-list");
  });
};
