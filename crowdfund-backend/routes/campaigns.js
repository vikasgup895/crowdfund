const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../utils/upload"); // Add this import
const {
  createCampaign,
  getCampaigns,
  getCampaign,
  getMyCampaigns,
  updateCampaignImage,
} = require("../controllers/campaignController");

router.get("/", getCampaigns);
router.get("/my", auth, getMyCampaigns);
router.get("/:id", getCampaign);
router.post("/", auth, upload.single("image"), createCampaign); // Modified this line
router.patch("/:id", auth, updateCampaignImage); // Add this line
module.exports = router;
