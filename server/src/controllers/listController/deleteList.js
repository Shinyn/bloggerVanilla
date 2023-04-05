const { pool } = require("../../database");

exports.deleteList = async function deleteList(req, res) {
  const userID = req.loggedInUser.id;
  const id = req.params.id;
  console.log("User that owns the list:", userID);
  console.log("Id of list:", id);

  //TODO: behöver validering
  const todoSql = `delete from todo where listID = ?`;
  pool.execute(todoSql, [id], (error, result) => {
    if (error) {
      res.status(500).send(error);
      return;
    }
    const sql = `delete from todoList where userID = ? and id = ?;`;
    pool.execute(sql, [userID, id], (error, result) => {
      if (error) {
        res.status(500).send(error);
        return;
      }
      res.status(200).send(result);
    });
  });
};
