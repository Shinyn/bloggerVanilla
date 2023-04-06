const joi = require("joi");
const { pool } = require("../../database");

exports.editTodo = async function editTodo(req, res) {
  const { todoID, isChecked } = req.body;

  const schema = joi.object({
    todoID: joi.number().required(),
    isChecked: joi.number().required(),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    res.status(400).json(validation.error.details[0].message);
    return;
  }

  const sql = `update todo set marked = ? where id = ?;`;
  pool.execute(sql, [isChecked, todoID], (error, result) => {
    if (error) {
      res.status(500).json(error);
      return;
    }
    res.status(200).json("Updated todo");
  });
};
