const jwt = require("jsonwebtoken");
const secret = process.env.DB_SECRET;

exports.checkAuthentication = function checkAuthentication(req, res, next) {
  const authToken = req.cookies.authToken;

  const loggedInUser = jwt.verify(authToken, secret);
  req.loggedInUser = loggedInUser;
  next();
};
