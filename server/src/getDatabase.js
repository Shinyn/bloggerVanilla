const { pool } = require("./database");

// TODO: Kolla så att man är inloggad först?

// Hämtar alla användare och skickar tillbaka dessa
exports.getDatabase = function getDatabase(req, res) {
  const sql = `select * from users`;
  pool.query(sql, (error, result) => {
    if (error) return res.status(400).send(error);
    res.status(200).send(result);
  });
};
