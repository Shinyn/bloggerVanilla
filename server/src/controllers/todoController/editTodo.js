"use strict";
const joi = require("joi");
const { pool } = require("../../database");

exports.editTodo = async function editTodo(req, res) {
  console.log(req);
  console.log(req.body);
  const { listID, isChecked, content } = req.body;

  const schema = joi.object({
    listID: joi.number().required(),
    isChecked: joi.number().required(),
    content: joi.string().min(1).required(),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    res.status(411).send(validation.error.details[0].message);
    return;
  }

  // Borde kanske ha 2 edits - en för checkboxen och en för texten
  // Dubbelkolla ID här
  const sql = `update todo set content = ?, marked = ? where id = ?;`;
  pool.execute(sql, [content, isChecked, listID], (error, result) => {
    if (error) {
      res.status(400).send(error);
      return;
    }
    res.status(202).send("Updated todo");
  });
};
