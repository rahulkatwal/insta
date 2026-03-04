// require jwt package here
const jwt = require("jsonwebtoken");
// create identifyUser functoin middler here
async function identifyUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized Access",
    });
  }
  // verfy token here

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Token Invailid" });
  }

  //   create new prop with req
  req.user = decoded;
  //   call next to pass the data to the controller
  next();
}

// export function here
module.exports = identifyUser;
