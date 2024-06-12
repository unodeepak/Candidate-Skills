const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const constant = require("../constant/constant");

exports.signup = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(constant.EXIST).json({
        msg: `User already exist with this email id '${email}'. Please Sign In`,
        success: false,
      });
    }

    const user = new User({ name, role, password, email });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = generateToken(user);
    return res
      .status(constant.CREATED)
      .json({ token, data: user, success: true });
  } catch (err) {
    console.log(err);
    return res
      .status(constant.SERVER_ERROR)
      .json({ msg: err.message, success: false });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(constant.BAD_REQUEST)
        .json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(constant.BAD_REQUEST)
        .json({ msg: "Invalid credentials" });
    }

    const token = generateToken(user);
    return res.status(constant.OK).json({ token, data: user });
  } catch (err) {
    return res.status(constant.SERVER_ERROR).send({ msg: "Server error" });
  }
};
