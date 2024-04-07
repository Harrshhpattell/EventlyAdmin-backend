const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.MONGODB_URI;
mongoose
  .connect(DB, { dbName: "Evently", bufferCommands: false })
  .then(() => console.log("DB connection successfull"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
