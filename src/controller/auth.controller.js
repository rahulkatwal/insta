const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register controller
async function registerController(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

  // new way to add chacker for user Existance with or operator

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  //   add checker
  if (isUserAlreadyExist) {
    return res.status(409).json({
      message:
        isUserAlreadyExist.email === email
          ? "Email Already Exist"
          : "Username Already Exist",
    });
  }
  // convet pass into hash
  const hash = await bcrypt.hash(password, 10);

  // create user with the help of usermodel
  const user = await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password: hash,
  });

  // create token
  // user ka data hona chahiye
  // data uniqure hona chahiye
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  // send cookie to client side
  res.cookie("token", token);
  res.status(201).json({
    message: "User Register Succesfuly",
    user: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

// login controller
async function loginController(req, res) {
  const { username, email, password } = req.body;

  // find user with the help of email and username
  const user = await userModel.findOne({
    $or: [{ email: email }, { username: username }],
  });

  //   if user note found
  if (!user) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }

  //   convert pass into hash

  const isPasswordValid = await bcrypt.compare(password, user.password);

  //   if password is not valid
  if (!isPasswordValid) {
    return res.status(404).json({
      message: "Password is Invalid",
    });
  }

  //   create token with jwt sign method
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
  );

  //   set token in cookie
  res.cookie("token", token);

  //   send response user login successfuly
  res.status(200).json({
    message: "User Login Successfuly",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

// exprot auth controllers
module.exports = {
  registerController,
  loginController,
};
