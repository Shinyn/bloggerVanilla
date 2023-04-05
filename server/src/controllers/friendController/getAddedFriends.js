const { pool } = require("../../database");

exports.getAddedFriends = function getAddedFriends(req, res) {
  const currentUserID = req.loggedInUser.id;

  if (Object.keys(req.query).length > 0 || Object.keys(req.body).length > 0) {
    res.status(400).json("You are not allowed to enter data here");
    return;
  }

  const sql = ``;
  pool.execute(sql, [], (error, result) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    res.status(200).json(result);
  });
};
