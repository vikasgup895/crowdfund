const express = require("express");
const Campaign = require("../models/Campaign");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Create a campaign
router.post("/create-campaign",authMiddleware, async (req, res) => {

  try {
    const { title, description, goal, duration, category, imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL is required" });
    }

    const deadline = new Date();
    deadline.setDate(deadline.getDate() + parseInt(duration));

    const creatorId = req.user._id; // Get user ID from decoded token
    if (!mongoose.Types.ObjectId.isValid(creatorId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
      const newCampaign = new Campaign({
        title,
        description,
        goalAmount: parseFloat(goal),
        deadline,
        category,
        imageUrl, // Store the image URL
        creator: creatorId, // Assuming user authentication
      });
  
      await newCampaign.save();
      res.status(201).json({ message: "Campaign created successfully!", campaign: newCampaign });
    } catch (error) {
      console.error("Error creating campaign:", error);
      res.status(500).json({ message: "Server error" });
    }
  });


// Get all campaigns
router.get("/", async (req, res) => {
    const campaigns = await Campaign.find();
    res.json(campaigns);
});

// Fund a campaign
router.post("/fund/:id", async (req, res) => {
    try {
        const { name, amount } = req.body;
        const campaign = await Campaign.findById(req.params.id);
        campaign.backers.push({ name, amount });
        campaign.currentAmount += amount;
        await campaign.save();
        res.json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
