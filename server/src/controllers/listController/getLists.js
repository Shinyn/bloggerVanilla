const { pool } = require("../../database");

exports.getLists = function getLists(req, res) {
  const userID = req.loggedInUser.id;

  if (Object.keys(req.query).length > 0 || Object.keys(req.body).length > 0) {
    res.status(400).send("You are not allowed to dispatch data here");
    return;
  }

  const sql = `select * from todoList where userID = ?`;
  pool.execute(sql, [userID], (error, result) => {
    if (error) {
      res.status(400).send(error);
      return;
    }
    if (result.length === 0) {
      res.status(404).send("You dont have any lists");
      return;
    }
    res.status(302).send(result);
  });
};
