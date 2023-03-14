const express = require("express");
const server = express();
const cors = require("cors");
const { getDatabase } = require("./getDatabase.js");
const { registerRoute } = require("./routes/registerRoute.js");
const { loginRoute } = require("./routes/loginRoute.js");
const cookieParser = require("cookie-parser");

server.use(express.json());
server.use(cookieParser());
server.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));

server.use("/register", registerRoute);

server.use("/login", loginRoute);

server.get("/", getDatabase);

server.listen(5050);

// middlewares in i egen mapp också
function checkAuthentication(req, res, next) {
  const authToken = req.cookies.authToken;
  if (authToken === "temporarySecretKey") {
    next();
    return;
  }
  res.status(403).send("Invalid cookie");
}
// const proclaim = querySelector("#proclaim");
