// this is used to create the server with the help of express
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

// use middleware
app.use(express.json());
app.use(cookieParser());

// Require Routes
const router = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const userRouter = require("./routes/user.routes");
// user authRoutes
app.use("/api/auth", router);
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);

// exprot app the help of module
module.exports = app;
