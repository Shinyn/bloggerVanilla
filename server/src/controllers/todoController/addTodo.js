"use strict";
const joi = require("joi");
const { pool } = require("../../database");

exports.addTodo = async function addTodo(req, res) {
  const { listID, isChecked, content } = req.body;

  // TODO: Kanske senare om tid finns
  // Måste kolla så att rätt användare lägger till todon till rätt lista
  const schema = joi.object({
    listID: joi.number().required(),
    isChecked: joi.number().required(),
    content: joi.string().min(1).required(),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }

  const sql = `insert into todo (listID, marked, content) values (?, ?, ?)`;
  pool.execute(sql, [listID, isChecked, content], (error, result) => {
    if (error && error.code === "ER_NO_REFERENCED_ROW_2") {
      res.status(404).send("That list does not exist");
      return;
    } else if (error) {
      res.status(400).send(error);
      return;
    }
    res.status(201).send("Added new todo to list");
  });
};

//FIXME: Får du "jwt error" - null / undefined === postman secure buggen!!!
//FIXME: isChecked måste va 0 för false och 1 för true
//FIXME: Kör du i postman får du alltid in id som en string!!!
