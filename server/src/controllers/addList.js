const { pool } = require("../database");

// Det jag förväntar mig är todo texten
exports.addList = async function addList(req, res) {
  console.log(req.body);
  console.log(req);
  // Har lyckats ta mig hit iallafall men efter loggen nedan verkar inget ske.
  // Det enda som skickats med är inputText från usern
  console.log("Server: addList");

  const { username, userInput } = req.body;

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
    // const todoText = "todo text we get from user";
    const sql = `insert into todoList (listID, listName) values (?, ?)`;
    pool.execute(sql, [userID, userInput], (error, result) => {
      if (error) {
        res.status(400).send(error);
        return;
      }
      res.send(result);
    });
  });
};

/* Gör dessa i ordning (och få dom att funka):

1. Posta todo - kolla att databasen har todo'n

*/
