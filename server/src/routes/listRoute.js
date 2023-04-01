const express = require("express");
const { addList } = require("../controllers/listController/addList");
const { deleteList } = require("../controllers/listController/deleteList");
const { getLists } = require("../controllers/listController/getLists");
const listRoute = express.Router();

listRoute.post("/", addList);

listRoute.get("/", getLists);

listRoute.delete("/", deleteList);

exports.listRoute = listRoute;
