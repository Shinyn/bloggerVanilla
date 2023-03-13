const { pool } = require("./database");

exports.getDatabase = function getDatabase(req, res) {
  const sql = `select * from users`;
  pool.query(sql, (error, result) => {
    if (error) return res.status(400).send(error, "nooooooo");
    res.status(200).send(result);
  });
};
