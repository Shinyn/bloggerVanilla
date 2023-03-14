const joi = require("joi");
const { pool } = require("../database");

exports.loginUser = function loginUser(req, res) {
  const { username, password } = req.body;

  // joi funnkar i POSTMAN men inte i webbläsaren?
  const schema = joi.object({
    username: joi.string().min(3).max(20).required(),
    password: joi.string().min(3).max(20).required(),
  });

  const validation = schema.validate(req.body);

  // Får ett error i sources tabben men ingen alert? :S
  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    window.alert("username and / or password was to short / to long");
    return;
  }

  // Är detta fel sätt att logga in?
  const sql = `select * from users where username = '?' and password = '?'`;
  pool.execute(sql, [username, password], (error, result) => {
    console.log(`error is ${error} and result is -${result}- :(`);
    if (error) {
      res.status(400).send(error);
      return;
    }
    res.status(200).send("You are logged in");
  });
};
