const { pool } = require("../database");

exports.addTodo = async function addTodo(req, res) {
  console.log("XX addTodo XX");

  const { username } = req.body;

  // Hämtar id på user
  const getUserId = `select id from users where username = ?`;
  pool.execute(getUserId, [username], (error, result) => {
    if (error) {
      res.status(400).send(error);
      return;
    }

    // Om id finns skapa todo
    console.log("result is:");
    console.log(result[0].id);

    const userID = result[0].id;
    const todoText = "todo text we get from user";
    const sql = `insert into todoList (listID, listName) values (?, ?)`;
    pool.execute(sql, [userID, todoText], (error, result) => {
      if (error) {
        res.status(400).send(error);
        return;
      }
      res.send(result);
    });
  });
};
