const jwt = require("jsonwebtoken");
const secret = process.env.DB_SECRET;

exports.checkAuthentication = function checkAuthentication(req, res, next) {
  const authToken = req.cookies.authToken;

  const loggedInUser = jwt.verify(authToken, secret);
  req.loggedInUser = loggedInUser;
  next();
  //   if (authToken === "temporarySecretKey") {
  //     next();
  //     return;
  //   }
  //   res.status(403).send("Invalid cookie");
};
