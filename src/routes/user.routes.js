// require express
const express = require("express");
const userController = require("../controller/user.controller");
const identifyUser = require("../middleware/auth.middleware");
const userRouter = express.Router();

// create API HERE
// @route POST api/users/follow/:userid
// @description Follow a user
// @access Private

userRouter.post(
  "/follow/:username",
  identifyUser,
  userController.followUserController,
);

// export userRouter
module.exports = userRouter;
