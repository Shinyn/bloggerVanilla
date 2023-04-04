const { pool } = require("../../database");
const joi = require("joi");

exports.deleteFriend = function deleteFriend(req, res) {
  const currentUser = req.loggedInUser.id;
  const { friendID } = req.body;

  const schema = joi.object({
    friendID: joi.number().required(),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }

  // check if you have the friend in your list
  const checkFriends = `select * from friendship where userID = ?;`;
  pool.execute(checkFriends, [currentUser], (err, resu) => {
    if (err) {
      res.status(400).send(err);
      return;
    }
    if (resu.length === 0) {
      res.status(404).send("You dont have any friends to remove");
      return;
    }

    if (friendID < 0) {
      res.status(400).send("Invalid friend");
      return;
    }

    if (currentUser == friendID) {
      res.status(406).send("You cant remove yourself, if you dont have any friends, you're all you got");
      return;
    }

    // Detta tog tid att lista ut.. du kan inte ta bort en vän du inte har.
    const entries = Object.entries(resu);
    const friendArray = [];
    entries.forEach((item) => friendArray.push(item[1]));
    const friendIdArray = [];
    friendArray.forEach((item) => friendIdArray.push(item.friendID));
    const friendIdAsNumber = Number(friendID);
    const foundFriend = friendIdArray.includes(friendIdAsNumber);

    if (!foundFriend) {
      res.status(404).send("You cant remove a friend you dont have");
      return;
    }

    const sql = `delete from friendship where userID = ? and friendID = ?;`;
    pool.execute(sql, [currentUser, friendID], (error, result) => {
      if (error) {
        res.status(500).send(error);
        return;
      }
      res.status(200).send("Friend deleted");
    });
  });
};
