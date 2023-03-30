"use strict";
const { pool } = require("../../database");

exports.deleteTodo = async function deleteTodo(req, res) {
  console.log(req);
  console.log("Delete Todo");

  //TODO: Hur ska jag få todo id? - GET till databasen där du hämtar listan med userID och
  // get listID from todoList where userId = req.body.id
  // get todoID from todo where listID = listID

  const getSql = `select * from `;

  const sql = `delete from todo where id = ?;`;
  pool.execute(sql, [id], (error, result) => {
    if (error) {
      res.status(400).send(error);
      return;
    }
    res.status(202).send("Updated todo");
  });
};
