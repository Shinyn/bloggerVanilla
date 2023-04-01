const joi = require("joi");
const { pool } = require("../../database");

exports.getFriends = function getFriends(req, res) {
  const currentUser = req.loggedInUser;
  const currentUserID = currentUser.id;

  const schema = joi.object({
    id: joi.number().required(),
    username: joi.string().required(),
    iat: joi.number().required(),
  });
  const validation = schema.validate(currentUser);

  if (validation.error) {
    res.status(404).send(validation.error.details[0].message);
    return;
  }

  const sql = `select * from users where id != ?`;
  pool.execute(sql, [currentUserID], (error, result) => {
    if (error) {
      res.status(400).send(error);
      return;
    }
    res.status(200).send(result);
  });
};
