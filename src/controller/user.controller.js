const followerModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  // validate self following

  if (followerUsername === followeeUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  //   create to check is user is exist or not
  const isFolloweeExist = await userModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExist) {
    return res.status(404).json({
      message: "User not Exist",
    });
  }

  //   to validate already followed
  const isAlreadyFollowing = await followerModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlreadyFollowing) {
    return res.status(200).json({
      message: "You Already Followed",
      follow: isAlreadyFollowing,
    });
  }

  const followRecord = await followerModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  //   send follow record in res
  res.status(201).json({
    message: `Your Are now following ${followeeUsername}`,
    follow: followRecord,
  });
}

// export follow user
module.exports = {
  followUserController,
};
