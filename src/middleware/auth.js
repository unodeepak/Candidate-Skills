const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const constant = require("../constant/constant");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(constant.UNAUTHORIZED)
      .json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = await User.findById(decoded.user.id);
    next();
  } catch (err) {
    return res.status(constant.UNAUTHORIZED).json({ msg: "Token is not valid" });
  }
};

module.exports = authMiddleware;
