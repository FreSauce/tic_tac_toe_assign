const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");

const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// We use put route because actually we create a user once. But both would be fine.

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.get("/profile", isAuth, authController.getProfile);

module.exports = router;
