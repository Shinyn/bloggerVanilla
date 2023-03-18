// const jwt = require("jsonwebtoken");
// const secret = process.env.DB_SECRET;

// exports.encyptUser = function encyptUser(req, res, next) {
//   const authToken = req.cookies.authToken;

//   const loggedInUser = jwt.sign(authToken, secret);
//   req.loggedInUser = loggedInUser;
//   next();
//   //   if (authToken === "temporarySecretKey") {
//   //     next();
//   //     return;
//   //   }
//   //   res.status(403).send("Invalid cookie");
// };
