const { pool } = require("../../database");

exports.addFriend = function addFriend(req, res) {
  const currentUser = req.loggedInUser.id;
  const friendIdString = req.params.id;
  const friendID = Number(friendIdString);

  if (Object.keys(req.query).length > 0 || Object.keys(req.body).length > 0) {
    res.status(400).json("You are not allowed to enter data here");
    return;
  }

  if (currentUser === friendID) {
    res.status(400).json("You cant add yourself");
    return;
  }

  const users = `select * from users where id != ?`;
  pool.execute(users, [currentUser], (err, resu) => {
    if (err) {
      res.status(500).json(err);
      return;
    }

    if (friendID - 1 > resu.length || friendID <= 0) {
      res.status(404).json("That user does not exist");
      return;
    }

    const sql = `insert ignore into friendship (userID, friendID) values (?, ?);`;
    pool.execute(sql, [currentUser, friendID], (error, result) => {
      if (error) {
        res.status(500).json(error);
        return;
      }
      if (result.warningStatus === 1) {
        res.status(500).json("You already have that friend in your friendlist");
        return;
      }
      res.status(200).json("Added friend");
    });
  });
};
