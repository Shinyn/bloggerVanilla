const { pool } = require("../../database");

exports.deleteTodo = async function deleteTodo(req, res) {
  const id = req.params.id;
  console.log("gonna delete todo:", id);

  //TODO: Validering

  if (!id) {
    res.status(404).send("Todo does not exist");
    return;
  }

  const sql = `delete from todo where id = ?;`;
  pool.execute(sql, [id], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).json(error);
      return;
    }
    res.status(200).json(result);
  });
};
