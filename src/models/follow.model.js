// require mongoose here
const mongoose = require("mongoose");

// ceate schema here
const followSchema = new mongoose.Schema(
  {
    follower: {
      type: String,
    },
    followee: {
      type: String,
    },
  },
  { timestamps: true },
);
followSchema.index * ({ follower: 1, followee: 1 }, { unique: true });
// create model here
const followerModel = mongoose.model("Follows", followSchema);

// export model
module.exports = followerModel;
