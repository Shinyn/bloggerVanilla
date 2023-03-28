const express = require("express");
const { addTodo } = require("../controllers/todoController/addTodo");
const { editTodo } = require("../controllers/todoController/editTodo");
const todoRoute = express.Router();

todoRoute.post("/", addTodo);

todoRoute.patch("/", editTodo);

// delete todo

// edit todo

exports.todoRoute = todoRoute;
