const express = require("express");
const { getUsers } = require("../controllers/userController");


const router = express.Router();

router
  .route("/allusers")
  .get(getUsers);


module.exports = router;
