const express = require("express");
const router = express.Router();
const authController = require("./../controllers/auth/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;