const { pool } = require("../../database");

exports.getTodo = function getTodo(req, res) {
  const listID = req.query.id;
  console.log(listID);

  if (Object.keys(req.body).length > 0) {
    res.status(400).send("You are not allowed to enter data here");
    return;
  }

  const sql = `select * from todo where listID = ?`;
  pool.execute(sql, [listID], (error, result) => {
    if (error) {
      res.status(400).send(error);
      return;
    }
    if (result.length === 0) {
      res.status(404).send("You dont have any todos");
      return;
    }
    res.status(302).send(result);
  });
};
