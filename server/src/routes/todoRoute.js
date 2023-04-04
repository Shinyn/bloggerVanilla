const express = require("express");
const { addTodo } = require("../controllers/todoController/addTodo");
const { deleteTodo } = require("../controllers/todoController/deleteTodo");
const { editTodo } = require("../controllers/todoController/editTodo");
const { getTodo } = require("../controllers/todoController/getTodo");
const todoRoute = express.Router();

todoRoute.post("/", addTodo);

todoRoute.patch("/", editTodo);

todoRoute.delete("/", deleteTodo);

todoRoute.get("/", getTodo);

exports.todoRoute = todoRoute;
