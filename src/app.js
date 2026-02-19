// this is used to create the server with the help of express
const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./routes/auth.routes");
const app = express();

// use middleware
app.use(express.json());
app.use(cookieParser());

// user authRoutes
app.use("/api/auth", router);

// exprot app the help of module
module.exports = app;
