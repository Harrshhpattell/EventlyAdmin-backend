const express = require("express");
const { getOrders } = require("../controllers/ordersController");


const router = express.Router();

router
  .route("/allorders")
  .get(getOrders);

//   router.route("/getUsersCountByMonth/:year").get(getUsersCountByMonth);


module.exports = router;
