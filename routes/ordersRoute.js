const express = require("express");
const { getOrders, getOrdersCountByMonth } = require("../controllers/ordersController");


const router = express.Router();

router
  .route("/allorders")
  .get(getOrders);

  router.route("/getOrdersCountByMonth/:year").get(getOrdersCountByMonth);


module.exports = router;
