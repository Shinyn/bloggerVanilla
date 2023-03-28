"use strict";
const { pool } = require("../../database");

exports.addList = async function addList(req, res) {
  console.log("addList");
  const userID = req.loggedInUser.id;
  const { userInput } = req.body;

  const sql = `insert into todoList (userID, listName) values (?, ?)`;
  pool.execute(sql, [userID, userInput], (error, result) => {
    if (error) {
      res.status(400).send(error);
      return;
    }
    res.status(201).send("Created new todo-list");
  });
};
