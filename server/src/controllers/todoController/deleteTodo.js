const { pool } = require("../../database");

exports.deleteTodo = async function deleteTodo(req, res) {
  const id = req.params.id;

  if (Object.keys(req.query).length > 0 || Object.keys(req.body).length > 0) {
    res.status(400).json("You are not allowed to enter data here");
    return;
  }

  if (!id) {
    res.status(404).json("Todo does not exist");
    return;
  }

  const sql = `delete from todo where id = ?;`;
  pool.execute(sql, [id], (error, result) => {
    if (error) {
      res.status(500).json(error);
      return;
    }
    res.status(200).json(result);
  });
};
