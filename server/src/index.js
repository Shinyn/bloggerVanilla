const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const server = express();
const { registerRoute } = require("./routes/registerRoute.js");
const { loginRoute } = require("./routes/loginRoute.js");
const { checkAuthentication } = require("./middlewares/checkAuthentication.js");
const { todoRoute } = require("./routes/todoRoute.js");
const { listRoute } = require("./routes/listRoute.js");
const { friendRoute } = require("./routes/friendRoute.js");

server.use(express.json());
server.use(cookieParser());
server.use(cors({ origin: "http://127.0.0.1:5500", credentials: true }));

server.use("/register", registerRoute);

server.use("/login", loginRoute);

server.use("/todo", checkAuthentication, todoRoute);

server.use("/todoList", checkAuthentication, listRoute);

server.use("/friends", checkAuthentication, friendRoute);

server.listen(5050);
