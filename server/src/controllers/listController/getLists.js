const { pool } = require("../../database");

exports.getLists = function getLists(req, res) {
  const userID = req.loggedInUser.id;

  const schema = joi.object({
    userID: joi.number().required(),
  });
  const validation = schema.validate(userID);

  if (validation.error) {
    res.status(404).send(validation.error.details[0].message);
    return;
  }

  const sql = `select * from todoList where userID = ?`;
  pool.execute(sql, [userID], (error, result) => {
    if (error) {
      res.status(400).send(error);
      return;
    } else {
      res.status(302).send("Found lists");
    }
  });
};
