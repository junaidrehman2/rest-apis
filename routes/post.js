const express = require("express");
const postController = require("../controller/postController");
const router = express.Router();

router.get("/", postController.index);

module.exports = router;
