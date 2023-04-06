const { pool } = require("../../database");
exports.getFriendLists = function getFriendLists(req, res) {
  const friendIdAsString = req.params.id;
  const friendID = Number(friendIdAsString);

  if (Object.keys(req.query).length > 0 || Object.keys(req.body).length > 0) {
    res.status(400).json("You are not allowed to enter data here");
    return;
  }

  const sql = `select * from todoList where userID = ?`;
  pool.execute(sql, [friendID], (error, result) => {
    if (error) {
      res.status(500).json(error);
      return;
    }
    if (result.length === 0) {
      res.status(404).json("That friend does not have any lists");
      return;
    }
    res.status(200).json(result);
  });
};
