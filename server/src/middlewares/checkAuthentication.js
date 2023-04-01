const jwt = require("jsonwebtoken");
const secret = process.env.DB_SECRET;

exports.checkAuthentication = function checkAuthentication(req, res, next) {
  const authToken = req.cookies.authToken;
  try {
    const loggedInUser = jwt.verify(authToken, secret);
    req.loggedInUser = loggedInUser;
    next();
  } catch (error) {
    res.status(401).send("You have to be logged in to do that");
  }
};
