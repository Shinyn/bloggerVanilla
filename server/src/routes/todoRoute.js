const express = require("express");
const { addTodo } = require("../controllers/todoController/addTodo");
const todoRoute = express.Router();

todoRoute.post("/", addTodo);

// delete todo

// edit todo

exports.todoRoute = todoRoute;
