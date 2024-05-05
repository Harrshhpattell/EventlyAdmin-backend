const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const eventRoute = require("./routes/eventRoute");
const ordersRoute = require("./routes/ordersRoute");
const authAdminRoute = require("./routes/authAdminRoute");
const categoryRoute = require("./routes/categoryRoute");
const adminListRoute = require("./routes/adminListRoute");

const app = express();
// 1) middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true, 
  }));
  

// 2) Route Handlers

// -----------------------------

// 3) Routes
app.use("/api/v1/admin", userRoute);
app.use("/api/v1/adminEvent", eventRoute);
app.use("/api/v1/adminOrders", ordersRoute);
app.use("/api/v1", authAdminRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/adminList", adminListRoute);


// 4) Server
module.exports = app;