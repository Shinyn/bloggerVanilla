const express = require("express");
const { addFriend } = require("../controllers/friendController/addFriend");
const { deleteFriend } = require("../controllers/friendController/deleteFriend");
const friendRoute = express.Router();

friendRoute.post("/", addFriend);

friendRoute.delete("/", deleteFriend);

exports.friendRoute = friendRoute;
