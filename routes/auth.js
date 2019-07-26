const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");
const { isEmail, hasPassword, hasName } = require("../validations/validators");
const passportJWT = require("../middleware/passportJWT")();

router.post("/login", [isEmail, hasPassword], authController.login);
router.post("/signup", [isEmail, hasPassword, hasName], authController.signup);
router.get("/me", passportJWT.authenticate(), authController.me);

module.exports = router;
