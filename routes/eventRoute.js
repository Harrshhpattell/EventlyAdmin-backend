const express = require("express");
const { getEvents, getEventsCountByMonth, deleteEvent } = require("../controllers/eventController");


const router = express.Router();

router
  .route("/allevents")
  .get(getEvents);

router.route("/getEventsCountByMonth/:year").get(getEventsCountByMonth);

router
  .route("/deleteEvent/:id")
  .delete(deleteEvent);

module.exports = router;
