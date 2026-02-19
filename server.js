// this is use to runn the server and also connect the databse
require("dotenv").config();
const app = require("./src/app");
const connectToDb = require("./src/config/databse");
const mongoose = require("mongoose");

// connect to the database
connectToDb();
// this is used to run the server
app.listen(3000, () => {
  console.log("Server is running");
});
