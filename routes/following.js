const express = require("express");
const followingController = require("../controller/followingController");
const router = express.Router();

router.post("/:id", followingController.index);

module.exports = router;