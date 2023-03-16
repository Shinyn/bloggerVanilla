const joi = require("joi");
const { pool } = require("../database");
const { getDatabase } = require("../getDatabase");

exports.loginUser = function loginUser(req, res) {
  const { username, password } = req.body;
  console.log("loginUser");

  const schema = joi.object({
    username: joi.string().min(3).max(20).required(),
    password: joi.string().min(3).max(20).required(),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }

  console.log("Kollar nu USERNAME i sql2");
  const sql2 = `select * from users where username = '${username}'`;
  console.log(sql2);
  //TODO: fixa hash, Dag 6

  // Är detta fel sätt att logga in? inte vanlig text men med hash ja
  const sql = `select * from users where username = '?' and password = '?'`;
  pool.execute(sql, [username, password], (error, result) => {
    if (error) {
      res.status(400).send(error);
      return;
    }

    res.cookie("authToken", "temporarySecretKey", {
      // 400 dagars cookie
      maxAge: 34560000000,
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });

    res.status(200).send("You are logged in");
  });
};
