const constant = require("../constant/constant.js");
const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(constant.OK).json({ data: users });
  } catch (err) {
    return res
      .status(constant.SERVER_ERROR)
      .json({ msg: err.message, success: false });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(constant.BAD_REQUEST).json({ msg: "User not found" });
    }
    return res.status(constant.OK).json({ data: user });
  } catch (err) {
    return res
      .status(constant.SERVER_ERROR)
      .json({ msg: err.message, success: false });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const { name, role, password } = req.body;

  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (name) user.name = name;
    if (role) user.role = role;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    return res.status(constant.OK).json({ data: user });
  } catch (err) {
    return res
      .status(constant.SERVER_ERROR)
      .json({ msg: err.message, success: false });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await User.findByIdAndRemove(req.params.id);

    return res.status(constant.OK).json({ msg: "User delete successfully" });
  } catch (err) {
    return res
      .status(constant.SERVER_ERROR)
      .json({ msg: err.message, success: false });
  }
};
