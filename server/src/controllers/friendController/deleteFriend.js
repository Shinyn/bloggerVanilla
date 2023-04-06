const { pool } = require("../../database");
const joi = require("joi");

exports.deleteFriend = function deleteFriend(req, res) {
  const currentUser = req.loggedInUser.id;
  const friendIdAsString = req.params.id;
  const friendID = Number(friendIdAsString);

  if (Object.keys(req.query).length > 0 || Object.keys(req.body).length > 0) {
    res.status(400).json("You are not allowed to enter data here");
    return;
  }

  const checkFriends = `select * from friendship where userID = ?;`;
  pool.execute(checkFriends, [currentUser], (err, resu) => {
    if (err) {
      res.status(400).json(err);
      return;
    }
    if (resu.length === 0) {
      res.status(404).json("You dont have any friends to remove");
      return;
    }

    if (friendID < 0) {
      res.status(400).json("Invalid friend");
      return;
    }

    if (currentUser === friendID) {
      res.status(400).json("You cant remove yourself, if you dont have any friends, you're all you got");
      return;
    }

    const entries = Object.entries(resu);
    const friendArray = [];
    entries.forEach((item) => friendArray.push(item[1]));
    const friendIdArray = [];
    friendArray.forEach((item) => friendIdArray.push(item.friendID));
    const friendIdAsNumber = Number(friendID);
    const foundFriend = friendIdArray.includes(friendIdAsNumber);

    if (!foundFriend) {
      res.status(404).json("You cant remove a friend you dont have");
      return;
    }

    const sql = `delete from friendship where userID = ? and friendID = ?;`;
    pool.execute(sql, [currentUser, friendID], (error, result) => {
      if (error) {
        res.status(500).json(error);
        return;
      }
      res.status(200).json("Removed friend");
    });
  });
};
