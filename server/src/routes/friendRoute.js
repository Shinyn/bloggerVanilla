const express = require("express");
const { addFriend } = require("../controllers/friendController/addFriend");
const { deleteFriend } = require("../controllers/friendController/deleteFriend");
const { getFriends } = require("../controllers/friendController/getFriends");
const friendRoute = express.Router();

friendRoute.post("/", addFriend);

friendRoute.get("/", getFriends);

friendRoute.delete("/", deleteFriend);

exports.friendRoute = friendRoute;
