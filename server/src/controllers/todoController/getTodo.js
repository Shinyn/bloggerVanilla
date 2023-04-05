const { pool } = require("../../database");

exports.getTodo = function getTodo(req, res) {
  const listID = req.params.id;

  if (Object.keys(req.body).length > 0) {
    res.status(400).json("You are not allowed to enter data here");
    return;
  }

  const sql = `select * from todo where listID = ?`;
  pool.execute(sql, [listID], (error, result) => {
    if (error) {
      res.status(500).json(error);
      return;
    }
    if (result.length === 0) {
      res.status(404).json("You dont have any todos");
      return;
    }
    res.status(302).json(result);
  });
};
