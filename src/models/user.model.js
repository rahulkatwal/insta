const mongoose = require("mongoose");

// create user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username must be unique"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    unique: [true, "Password must be unique"],
  },
  bio: String,
  profileImage: {
    type: String,
    default: "User-Profile-PNG-File.png",
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

// create user model
const userModel = mongoose.model("user", userSchema);

// export user model
module.exports = userModel;
