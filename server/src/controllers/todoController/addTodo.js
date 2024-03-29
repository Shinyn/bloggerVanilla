const joi = require("joi");
const { pool } = require("../../database");

exports.addTodo = async function addTodo(req, res) {
  const { listID, content } = req.body;
  const schema = joi.object({
    listID: joi.number().required(),
    content: joi.string().min(1).max(255).required(),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    res.status(400).json(validation.error.details[0].message);
    return;
  }

  const sql = `insert into todo (listID, marked, content) values (?, ?, ?)`;
  pool.execute(sql, [listID, 0, content], (error, result) => {
    if (error && error.code === "ER_NO_REFERENCED_ROW_2") {
      res.status(404).json("That list does not exist");
      return;
    } else if (error && error.code === "ER_DATA_TOO_LONG") {
      res.status(500).json("Todo is to long, 255 characters max");
      return;
    } else if (error) {
      res.status(500).json(error);
      return;
    }
    res.status(201).json({ content: content, completed: 0, id: result.insertId });
  });
};
