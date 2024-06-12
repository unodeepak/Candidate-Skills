const mongoose = require("mongoose");

const emailRegex = /^\S+@\S+\.\S+$/;
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Email is required"],
      trim: true,
      match: [emailRegex, 'Please enter a valid email address']
    },
    role: {
      type: String,
      enum: ["candidate", "reviewer"],
      default: "candidate",
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema, "user");
module.exports = userModel;
