const mongoose = require("mongoose");

// create function to connect to the database
async function connectToDb() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Database is connected");
}
// export the function to connect to the database
module.exports = connectToDb;
