const express = require("express");
const { getEvents, getEventsCountByMonth } = require("../controllers/eventController");


const router = express.Router();

router
  .route("/allevents")
  .get(getEvents);

  router.route("/getEventsCountByMonth/:year").get(getEventsCountByMonth);


module.exports = router;
