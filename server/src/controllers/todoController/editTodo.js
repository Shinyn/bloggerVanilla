"use strict";
const { pool } = require("../../database");

exports.editTodo = async function editTodo(req, res) {
  console.log(req);
  const { listID, isChecked, content } = req.body;

  const sql = `update todo set marked = ? where id = ?;`;
  pool.execute(sql, [listID, isChecked, content], (error, result) => {
    if (error) {
      res.status(400).send(error);
      return;
    }
    res.status(201).send("Added new todo to list");
  });
};

//-- Ha en patch för när man byter marked och en patch för när man uppdaterar content
