"use strict";
const { pool } = require("../../database");

exports.editTodo = async function editTodo(req, res) {
  console.log(req);
  const { listID, isChecked, content } = req.body;

  const sql = `update todo set content = ?, marked = ? where id = ?;`;
  pool.execute(sql, [content, isChecked, listID], (error, result) => {
    if (error) {
      res.status(400).send(error);
      return;
    }
    res.status(202).send("Updated todo");
  });
};
