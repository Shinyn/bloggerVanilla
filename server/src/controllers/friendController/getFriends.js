const { pool } = require("../../database");

exports.getFriends = function getFriends(req, res) {
  const currentUserID = req.loggedInUser.id;

  if (Object.keys(req.query).length > 0 || Object.keys(req.body).length > 0) {
    res.status(400).json("You are not allowed to enter data here");
    return;
  }

  const sql = `select id, username from users where id != ?`;
  pool.execute(sql, [currentUserID], (error, result) => {
    if (error) {
      res.status(500).json(error);
      return;
    }
    res.status(200).json(result);
  });
};
