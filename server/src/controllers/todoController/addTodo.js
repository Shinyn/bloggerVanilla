"use strict";
const { pool } = require("../../database");

exports.addTodo = async function addTodo(req, res) {
  console.log(req);
  const { listID, isChecked, content } = req.body;

  const sql = `insert into todo (listID, marked, content) values (?, ?, ?)`;
  pool.execute(sql, [listID, isChecked, content], (error, result) => {
    if (error) {
      res.status(400).send(error);
      return;
    }
    res.status(201).send("Added new todo to list");
  });
};

//FIXME: Får du "jwt error" - null / undefined === postman secure buggen!!!
//FIXME: isChecked måste va 0 för false och 1 för true
