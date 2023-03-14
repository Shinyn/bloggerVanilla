const express = require("express");
const server = express();
const cors = require("cors");
const { getDatabase } = require("./getDatabase.js");
const { registerRoute } = require("./routes/registerRoute.js");
const { loginRoute } = require("./routes/loginRoute.js");

server.use(express.json());
server.use(cors());

server.use("/register", registerRoute);

server.use("/login", loginRoute);

server.get("/", getDatabase);

server.listen(5050);

// const proclaim = querySelector("#proclaim");
