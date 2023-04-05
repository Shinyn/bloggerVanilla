const { pool } = require("../../database");

exports.deleteList = async function deleteList(req, res) {
  const userID = req.loggedInUser.id;
  const id = req.params.id;

  if (Object.keys(req.query).length > 0 || Object.keys(req.body).length > 0) {
    res.status(400).json("You are not allowed to enter data here");
    return;
  }

  const todoSql = `delete from todo where listID = ?`;
  pool.execute(todoSql, [id], (error, result) => {
    if (error) {
      res.status(500).json(error);
      return;
    }
    const sql = `delete from todoList where userID = ? and id = ?;`;
    pool.execute(sql, [userID, id], (error, result) => {
      if (error) {
        res.status(500).json(error);
        return;
      }
      res.status(200).json(result);
    });
  });
};
