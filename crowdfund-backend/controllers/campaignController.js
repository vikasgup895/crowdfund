const Campaign = require("../models/Campaign");

exports.createCampaign = async (req, res, next) => {
  try {
    const campaignData = {
      ...req.body,
      creator: req.user.id,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    };

    const campaign = new Campaign(campaignData);
    await campaign.save();
    res.status(201).json(campaign);
  } catch (err) {
    next(err);
  }
};

exports.getCampaigns = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find().populate("creator", "name email");
    res.json(campaigns);
  } catch (err) {
    next(err);
  }
};

exports.getCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id).populate(
      "creator",
      "name email"
    );
    await campaign.save();
    if (!campaign)
      return res.status(404).json({ message: "Campaign not found" });
    res.json(campaign);
  } catch (err) {
    next(err);
  }
};

exports.getMyCampaigns = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find({ creator: req.user.id });
    res.json(campaigns);
  } catch (err) {
    next(err);
  }
};

// Add this temporary route to your campaignController.js for testing
// Add this to your campaignController.js file
exports.updateCampaignImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { imageUrl } = req.body;

    const campaign = await Campaign.findByIdAndUpdate(
      id,
      { imageUrl },
      { new: true }
    ).populate("creator", "name email");

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.json(campaign);
  } catch (err) {
    next(err);
  }
};
