const { pool } = require("../database");

// Det jag förväntar mig är todo texten
exports.addList = async function addList(req, res) {
  //   console.log(req.body);
  //   console.log(req);

  // HÄR---------------------------------!!
  // All info finns i loggedInUser objektet
  console.log("Server: addList");

  console.log(req.loggedInUser);
  const userID = req.loggedInUser.id;
  const { userInput, isChecked } = req.body;

  const sql = `insert into todoList (userID, listName, marked) values (?, ?, ?)`;
  pool.execute(sql, [userID, userInput, isChecked], (error, result) => {
    if (error) {
      res.status(400).send(error);
      return;
    }
    res.status(200).send(result);
  });
};

// Hämtar id på user
//   const getUserId = `select id from users where username = ?`;
//   pool.execute(getUserId, [username], (error, result) => {
//     if (error) {
//       res.status(400).send(error);
//       return;
//     }

//     // Om id finns skapa todo
//     console.log("result is:");
//     console.log(result[0].id);

//     const userID = result[0].id;
//     // const todoText = "todo text we get from user";

//   });
// };

/* Gör dessa i ordning (och få dom att funka):

1. Posta todo - kolla att databasen har todo'n

*/
