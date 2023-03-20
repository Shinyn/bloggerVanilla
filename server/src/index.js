const express = require("express");
const server = express();
const cors = require("cors");
const { getDatabase } = require("./getDatabase.js");
const { registerRoute } = require("./routes/registerRoute.js");
const { loginRoute } = require("./routes/loginRoute.js");
const cookieParser = require("cookie-parser");
const { checkAuthentication } = require("./middlewares/checkAuthentication.js");

server.use(express.json());
server.use(cookieParser());
server.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));

server.use("/register", registerRoute);

server.use("/login", loginRoute);

server.post("/todo", (req, res) => {
  // kolla så att rätt användare är inloggad
  // lägg till todo, validera också
});

// server.use(checkAuthentication);
server.get("/profile", checkAuthentication, (req, res) => {
  console.log(req);
  const { username } = req.loggedInUser;

  res.send(username);
  return;
});

// FIXME:
// server.use("/friends", checkAuthentication, friendRoute);

//TODO: Vi behöver köra en get till våran databas för att kunna kolla om det är rätt user inloggad.
server.get("/friends", (req, res) => {});

server.get("/", getDatabase);

server.listen(5050);

// const proclaim = querySelector("#proclaim");

// TODO: fixa authenticationRoute med login och register. Och friendRoute / controller - get / add friends
