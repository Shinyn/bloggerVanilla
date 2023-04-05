const { pool } = require("../../database");

exports.getFriends = function getFriends(req, res) {
  const currentUser = req.loggedInUser;
  const currentUserID = currentUser.id;

  //TODO: validation

  const sql = `select id, username from users where id != ?`;
  pool.execute(sql, [currentUserID], (error, result) => {
    if (error) {
      res.status(500).json(error);
      return;
    }
    res.status(200).json(result);
  });
};
