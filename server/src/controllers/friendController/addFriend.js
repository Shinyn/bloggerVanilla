const { pool } = require("../../database");

exports.addFriend = function addFriend(req, res) {
  const currentUser = req.loggedInUser.id;
  const friendIdString = req.params.id;
  const friendID = Number(friendIdString);

  console.log("LoggedinUser and params.id", req.loggedInUser, req.params.id);
  console.log(typeof req.loggedInUser.id);
  console.log(typeof req.params.id);
  console.log(friendID, typeof friendID);
  console.log(currentUser, typeof currentUser);

  // console.log(`Current user: ${currentUser}, friendID: ${friendID}`);

  if (Object.keys(req.query).length > 0 || Object.keys(req.body).length > 0) {
    res.status(400).json("You are not allowed to enter data here");
    return;
  }

  if (currentUser == friendID) {
    res.status(400).json("You cant add yourself");
    return;
  }

  const users = `select * from users where id != ?`;
  pool.execute(users, [currentUser], (err, resu) => {
    if (err) {
      console.log("500 error från select users", err);
      res.status(500).json(err);
      return;
    }
    // Den här valideringen är knas
    if (friendID > resu.length || friendID <= 0) {
      console.log("Eventuella Knas valideringen:", err);
      res.status(404).json("That user does not exist");
      return;
    }

    const sql = `insert into friendship (userID, friendID) values (?, ?);`;
    pool.execute(sql, [currentUser, friendID], (error, result) => {
      if (error && error.code === "ER_DUP_ENTRY") {
        res.status(500).json("You already have that friend in your friendlist");
        console.log("Could it be this:", error, error.code);
        return;
      } else if (error) {
        console.log("Error 500 here:", error);
        res.status(500).json(error);
        return;
      }
      console.log("assssssssssssssssssssssssssssssssssssssssssssssssss");
      res.status(200).json("Added friend");
    });
  });
};
