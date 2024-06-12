const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

router.post("/createQuestion", questionController.createQuestion);
router.get("/getQuestions", questionController.getQuestions);

router.put(
  "/updateQuestionById/:questionId",
  questionController.updateQuestionById
);
router.delete(
  "/deleteQuestionById/:questionId",
  questionController.deleteQuestionById
);

module.exports = router;
