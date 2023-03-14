const joi = require("joi");
const { pool } = require("../database");

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

  // Är detta fel sätt att logga in? inte vanlig text men med hash ja
  const sql = `select * from users where username = '?' and password = '?'`;
  pool.execute(sql, [username, password], (error, result) => {
    console.log(`error is ${error} and result is -${result}- :(`);
    if (error) {
      res.status(400).send(error);
      return;
    }

    res.cookie("authToken", "temporarySecretKey", {
      maxAge: 999999999,
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });

    res.status(200).send("You are logged in");
  });
};
