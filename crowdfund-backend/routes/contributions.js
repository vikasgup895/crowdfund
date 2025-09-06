const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  contribute,
  getMyContributions,
} = require("../controllers/contributionController");

router.post("/", auth, contribute);
router.get("/my", auth, getMyContributions);

module.exports = router;
