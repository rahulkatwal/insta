const postModel = require("../models/post.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Imagekit = require("@imagekit/nodejs");
// const { tofile } = require("@imagekit/nodejs");

// initiate image kit
const imagekit = new Imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// create post api here
async function createPostController(req, res) {
  const token = req.cookies.token;
  // upload file using imagekit
  const file = await imagekit.files.upload({
    file: req.file.buffer.toString("base64"),
    fileName: "image",
    folder: "insta_clone",
  });
  // create post using postModel
  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });
  res.status(201).json({
    message: "Post created successfuly.",
    post,
  });
}

// create get post api here
async function getPostController(req, res) {
  // user middlerware here

  const userId = req.user.id;
  // create a post var and find post using postmodel find method
  const post = await postModel.find({ user: userId });
  res.status(200).json({
    message: "Post Fetched Successfully",
    post,
  });
}

// create new get post detials API here
async function getPostDetailsController(req, res) {
  // user middlerware here
  const userId = req.user.id;
  const postId = req.params.postId;
  // find post with help of postmodel with find method
  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const isValidUser = post.user.toString() === userId;
  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbiden Content",
    });
  }
  return res.status(200).json({
    message: "Post Fetched Successfuly",
    post,
  });
}
// export post api here
module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
};
