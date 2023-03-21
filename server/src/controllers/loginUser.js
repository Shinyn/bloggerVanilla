const joi = require("joi");
const { pool } = require("../database");
const { getDatabase } = require("../getDatabase");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = process.env.DB_SECRET;

exports.loginUser = async function loginUser(req, res) {
  const { username, password } = req.body;

  const schema = joi.object({
    username: joi.string().min(3).max(20).required(),
    password: joi.string().min(3).max(20).required(),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }

  // Behöver checka databasen och kolla om användaren ens finns
  const getUser = `select * from users where username = ?`;
  pool.execute(getUser, [username], (error, result) => {
    if (error) {
      res.status(404).send(error);
      return;
    }

    if (result.length === 0) {
      res.status(404).send(error);
      return;
    }
    // console.log(result);
    // console.log(result.length);
    // console.log("see any length?");

    // TODO: FIXME:
    // console.log(req);

    //TODO: fixa hash, Dag 6
    const getPassword = `select * from users where username = ?`;
    pool.execute(getPassword, [username], (error, result) => {
      if (error) {
        res.status(400).send(error);
        return;
      }

      console.log("loginUser.js på servern >--------<");
      // console.log(result);
      const storedPassword = result[0].password;
      const isEqual = bcrypt.compare(password, storedPassword);
      if (isEqual) {
        const user = Object.assign({}, result[0]);
        delete user.password;
        // console.log(user);
        const authToken = jwt.sign(user, secret);
        // console.log(authToken);
        res.cookie("authToken", authToken, {
          // 400 dagars cookie
          maxAge: 34560000000,
          sameSite: "none",
          // postman gillar inte när det är secure
          secure: true,
          httpOnly: true,
        });
        res.status(200).send("You are logged in");
      } else {
        res.sendStatus(401);
      }
    });
  });
};
