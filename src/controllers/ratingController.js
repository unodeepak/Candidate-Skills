const Rating = require("../models/ratingModel");
const Question = require("../models/questionModel");
const constant = require("../constant/constant");

exports.rateResponse = async (req, res) => {
  const { rating, questionId } = req.body;
  const userId = req.user.id;

  try {
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(constant.NOT_FOUND).json({ msg: "Question not found" });
    }

    const newRating = await Rating.create({
      skillId: question.skillId,
      difficulty_level: question.difficulty_level,
      rating,
      user: userId,
      question: questionId,
    });

    return res.status(constant.OK).json({ data: newRating, success: true });
  } catch (err) {
    return res
      .status(constant.SERVER_ERROR)
      .json({ msg: err.message, success: false });
  }
};

exports.getAggregatedSkills = async (req, res) => {
  try {
    const ratings = await Rating.aggregate([
      {
        $group: {
          _id: "$skillId",
          easy: {
            $sum: { $cond: [{ $eq: ["$difficulty_level", "easy"] }, 1, 0] },
          },
          medium: {
            $sum: { $cond: [{ $eq: ["$difficulty_level", "medium"] }, 1, 0] },
          },
          hard: {
            $sum: { $cond: [{ $eq: ["$difficulty_level", "hard"] }, 1, 0] },
          },
          totalRating: {
            $sum: {
              $cond: [
                { $eq: ["$difficulty_level", "easy"] },
                { $multiply: ["$rating", 1] },
                {
                  $cond: [
                    { $eq: ["$difficulty_level", "medium"] },
                    { $multiply: ["$rating", 2] },
                    { $multiply: ["$rating", 3] },
                  ],
                },
              ],
            },
          },
        },
      },
      {
        $project: {
          skillId: "$_id",
          rating: {
            $divide: [
              "$totalRating",
              {
                $add: [
                  "$easy",
                  { $multiply: ["$medium", 2] },
                  { $multiply: ["$hard", 3] },
                ],
              },
            ],
          },
        },
      },
    ]);

    return res.status(constant.OK).json({ data: ratings, success: true });
  } catch (err) {
    return res
      .status(constant.SERVER_ERROR)
      .json({ msg: err.message, success: false });
  }
};
