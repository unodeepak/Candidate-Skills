const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  skillId: { type: Number, required: true },
  difficulty_level: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
    default: "easy",
  },
  question: { type: String, required: true },
  response: { type: String, default: "" },
});

module.exports = mongoose.model("Question", questionSchema, "Question");
