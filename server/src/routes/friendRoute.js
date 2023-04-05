const express = require("express");
const { addFriend } = require("../controllers/friendController/addFriend");
const { deleteFriend } = require("../controllers/friendController/deleteFriend");
const { getAddedFriends } = require("../controllers/friendController/getAddedFriends");
const { getFriends } = require("../controllers/friendController/getFriends");
const friendRoute = express.Router();

friendRoute.post("/:id", addFriend);

friendRoute.get("/", getFriends);

friendRoute.get("/added", getAddedFriends);

friendRoute.delete("/", deleteFriend);

exports.friendRoute = friendRoute;
