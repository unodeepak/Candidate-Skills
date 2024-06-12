const Question = require("../models/questionModel");
const constant = require("../constant/constant");

exports.createQuestion = async (req, res) => {
  const { skillId, difficulty_level, question } = req.body;

  try {
    const newQuestion = new Question({ skillId, difficulty_level, question });
    await newQuestion.save();

    return res
      .status(constant.CREATED)
      .json({ data: newQuestion, success: true });
  } catch (err) {
    return res
      .status(constant.SERVER_ERROR)
      .json({ msg: err.message, success: false });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    return res.status(constant.OK).json({ data: questions, success: true });
  } catch (err) {
    return res
      .status(constant.SERVER_ERROR)
      .json({ msg: err.message, success: false });
  }
};

exports.updateQuestionById = async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const questionExist = await Question.findById(questionId);
    if (!questionExist) {
      return res
        .status(constant.BAD_REQUEST)
        .json({ msg: "Invalid questionId", success: true });
    }

    const question = await Question.findByIdAndUpdate(questionId, req.body);
    return res.status(constant.OK).json({ data: question, success: true });
  } catch (err) {
    return res
      .status(constant.SERVER_ERROR)
      .json({ msg: err.message, success: false });
  }
};

exports.deleteQuestionById = async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const questionExist = await Question.findById(questionId);
    if (!questionExist) {
      return res
        .status(constant.BAD_REQUEST)
        .json({ msg: "Invalid questionId", success: true });
    }

    await Question.findByIdAndDelete(questionId);
    return res
      .status(constant.OK)
      .json({ msg: "Question delete successfully", success: true });
  } catch (err) {
    return res
      .status(constant.SERVER_ERROR)
      .json({ msg: err.message, success: false });
  }
};
