const express = require("express");
const { addList } = require("../controllers/listController/addList");
const { updateTodo } = require("../controllers/updateTodo");
const listRoute = express.Router();

listRoute.post("/", addList);

listRoute.delete("/");

// Ska uppdatera checkboxen i todon (eller om det är todoList)
// listRoute.patch("/", updateTodo);

// listRoute.get("/", addList);

exports.listRoute = listRoute;
