const express = require("express");
const postRouter = express.Router();
const postController = require("../controller/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

// create a post API HERE
// POST  /api/post [protected] api should be protected
// req.body = {caption,imgUrl}
postRouter.post(
  "/",
  upload.single("image"),
  postController.createPostController,
);

// create GET USER POST api using get method
postRouter.get("/", postController.getPostController);
// create GET user details but post id jo hai dynamicaly aageyi using :postId
// and return kraegi post ki details with specific userid and also check kragegi ki jis user ki req. aayi hai uski post hai ya nhi
postRouter.get("/details/:postId", postController.getPostDetailsController);
// export postRouter
module.exports = postRouter;
