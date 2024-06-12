const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/ratingController");
const authMiddleware = require("../middleware/auth");

router.post("/rateResponse", authMiddleware, ratingController.rateResponse);
router.get(
  "/getAggregatedSkills",
  authMiddleware,
  ratingController.getAggregatedSkills
);

module.exports = router;
