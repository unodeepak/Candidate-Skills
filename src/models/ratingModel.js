const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const ratingSchema = new mongoose.Schema({
  skillId: { type: Number, required: true },
  difficulty_level: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
  rating: { type: Number, required: true },
  user: { type: ObjectId, ref: "User", required: true },
  question: {
    type: ObjectId,
    ref: "Question",
    required: true,
  },
});

module.exports = mongoose.model("Rating", ratingSchema, "Rating");
