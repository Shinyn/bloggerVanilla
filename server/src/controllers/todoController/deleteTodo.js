"use strict";
const joi = require("joi");
const { pool } = require("../../database");

exports.deleteTodo = async function deleteTodo(req, res) {
  console.log(req);
  const userID = req.loggedInUser.id;
  console.log("Delete Todo");

  //TODO: Validering
  //TODO: Hur ska jag få todo id? - GET till databasen där du hämtar listan med userID och sen ListID sen TodoID???
  // get listID from todoList where userId = req.body.id
  // get todoID from todo where listID = listID

  const listIDs = `select * from todoList where userID = ?;`;
  pool.execute(listIDs, [userID], (error, result) => {
    if (error) {
      res.status(400).send(error);
      return;
    }
    // Denna skickas när man kör delete (för den är inte klar än)
    res.status(302).send("Got listID");
    console.log(result);
    // Nu har vi alla listor - nu ska vi hämta rätt lista
    const todoIDs = `select * from todo where listIDs = ?;`;
    pool.execute(todoIDs, []);
  });

  //   console.log(userLists);
  //   const sql = `delete from todo where id = ?;`;
  //   pool.execute(sql, [id], (error, result) => {
  //     if (error) {
  //       res.status(400).send(error);
  //       return;
  //     }
  //     res.status(202).send("Updated todo");
  //   });
};
