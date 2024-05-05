const express = require("express");
const { getEvents, getEventsCountByMonth, deleteEvent } = require("../controllers/eventController");
const { protect } = require('../controllers/auth/authController');

const router = express.Router();

router
  .route("/allevents")
  .get(protect,getEvents);

router.route("/getEventsCountByMonth/:year").get(protect,getEventsCountByMonth);

router
  .route("/deleteEvent/:id")
  .delete(protect,deleteEvent);

module.exports = router;
