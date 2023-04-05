const joi = require("joi");
const { pool } = require("../database");
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
    res.status(400).json(validation.error.details[0].message);
    return;
  }

  // Kollar om användaren finns
  const getUser = `select * from users where username = ?`;
  pool.execute(getUser, [username], (err, resu) => {
    if (err || resu.length === 0) {
      res.status(404).json("User doesn't exist");
      return;
    }

    // Hämtar user objektet från databasen
    const getUserObject = `select * from users where username = ?`;
    pool.execute(getUserObject, [username], (error, result) => {
      if (error) {
        res.status(500).json(error);
        return;
      }

      // Kollar om password stämmer
      const storedPassword = result[0].password;
      const isEqual = bcrypt.compareSync(password, storedPassword);
      if (isEqual) {
        const user = Object.assign({}, result[0]);
        delete user.password;
        const authToken = jwt.sign(user, secret);
        res.cookie("authToken", authToken, {
          // 400 dagars cookie
          maxAge: 34560000000,
          sameSite: "none",
          secure: true,
          httpOnly: true,
        });
        res.status(200).json("You are logged in");
      } else {
        res.status(401).json("Incorrect login details");
      }
    });
  });
};
