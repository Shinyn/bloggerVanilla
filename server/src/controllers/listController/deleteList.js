"use strict";
const { pool } = require("../../database");

exports.deleteList = async function deleteList(req, res) {
  const userID = req.loggedInUser.id;

  // hämta id från knappen
  const sql = `delete from todoList where userID = ? and id = ?;`;
  pool.execute(sql, [userID], (error, result) => {
    if (error) {
      res.status(400).send(error);
      return;
    }
    res.status(200).send(result);
  });
};
