const express = require("express");
const { getUsers, getUsersCountByMonth } = require("../controllers/userController");


const router = express.Router();

router
  .route("/allusers")
  .get(getUsers);

  router.route("/getUsersCountByMonth/:year").get(getUsersCountByMonth);


module.exports = router;
