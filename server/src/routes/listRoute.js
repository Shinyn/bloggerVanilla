const express = require("express");
const { addList } = require("../controllers/addList");
const listRoute = express.Router();

listRoute.post("/", addList);

// listRoute.get("/", addList);

exports.listRoute = listRoute;
