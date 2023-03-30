"use strict";
const { pool } = require("../../database");

exports.deleteList = async function deleteList(req, res) {
  const userID = req.loggedInUser.id;

  const schema = joi.object({
    userID: joi.string().min(1).required(),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }

  // TODO:
  // hämta id från knappen
  // måste delete alla todos i listan också - DETTA ÄR INTE MED I UPPGIFTEN
  const sql = `delete from todoList where userID = ? and id = ?;`;
  pool.execute(sql, [userID], (error, result) => {
    if (error) {
      res.status(400).send(error);
      return;
    }
    res.status(200).send(result);
  });
};
