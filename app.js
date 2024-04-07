const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const eventRoute = require("./routes/eventRoute");

const app = express();
// 1) middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3001" 
  }));
  

// 2) Route Handlers

// -----------------------------

// 3) Routes
app.use("/api/v1/admin", userRoute);
app.use("/api/v1/adminEvent", eventRoute);


// 4) Server
module.exports = app;