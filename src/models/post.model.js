const mongoose = require("mongoose");

// create schema using mongoose

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  imgUrl: {
    type: String,
    required: [true, "imgUrl is required to creating a post"],
  },
  user: {
    ref: "users",
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User Id is Required to Create a post"],
  },
});

// create post model using mongoose and jpostSchema

const postModel = mongoose.model("posts", postSchema);
// export postModel with the help of module.exports
module.exports = postModel;
