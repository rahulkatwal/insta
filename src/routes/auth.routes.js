const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
// create register route and its api
router.post("/register", authController.registerController);

// create login route and its api
router.post("/login", authController.loginController);

// create userapi using get


// export router
module.exports = router;
