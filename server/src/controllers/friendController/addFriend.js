const joi = require("joi");
const { pool } = require("../../database");

exports.addFriend = function addFriend(req, res) {
  const currentUser = req.loggedInUser.id;
  const { friendID } = req.body;

  const schema = joi.object({
    friendID: joi.number().required(),
  });
  const validation = schema.validate(req.body);

  if (validation.error) {
    res.status(404).send(validation.error.details[0].message);
    return;
  }

  if (currentUser == friendID) {
    res.status(406).send("You cant add yourself");
    return;
  }

  const users = `select * from users where id != ?`;
  pool.execute(users, [currentUser], (err, resu) => {
    if (err) {
      res.status(400).send(err);
      return;
    }
    if (friendID > resu.length || friendID <= 0) {
      res.status(404).send("That user does not exist");
      return;
    }

    const sql = `insert into friendship (userID, friendID) values (?, ?);`;
    pool.execute(sql, [currentUser, friendID], (error, result) => {
      if (error && error.code === "ER_DUP_ENTRY") {
        res.status(406).send("You already have that friend in your friendlist");
        return;
      } else if (error) {
        res.status(500).send(error);
        return;
      }
      res.status(200).send("Friend added");
    });
  });
};
