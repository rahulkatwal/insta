// require mongoose here
const mongoose = require("mongoose");

// ceate schema here
const followSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Follower is Required"],
  },
  followee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Followee is Required"],
  },
  timestamps: true,
});

// create model here
const followerModel = mongoose.model("Follows", followSchema);

// export model
module.exports = followerModel;
