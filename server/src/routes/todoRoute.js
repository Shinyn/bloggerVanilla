const express = require("express");
const { addTodo } = require("../controllers/addTodo");
const todoRoute = express.Router();

todoRoute.post("/", addTodo);

exports.todoRoute = todoRoute;
