const Contribution = require("../models/Contribution");
const Campaign = require("../models/Campaign");

exports.contribute = async (req, res, next) => {
  try {
    const { campaignId, amount, message, paymentMethod, paymentSessionId } =
      req.body;

    // Validation
    if (!campaignId || !amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid contribution data",
      });
    }

    // In a real app, verify payment with payment gateway here
    // For now, we'll simulate successful payment

    const contribution = new Contribution({
      campaign: campaignId,
      backer: req.user.id,
      amount,
      message,
      paymentMethod: paymentMethod || "credit_card",
      paymentSessionId,
      status: "completed", // In real app, this might be 'pending' initially
    });

    await contribution.save();

    // Update campaign stats
    await Campaign.findByIdAndUpdate(campaignId, {
      $inc: { currentAmount: amount, totalBackers: 1 },
    });

    res.status(201).json({
      success: true,
      contribution,
      message: "Payment processed successfully",
    });
  } catch (err) {
    console.error("Error in contribute:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getMyContributions = async (req, res, next) => {
  try {
    const contributions = await Contribution.find({
      backer: req.user.id,
    }).populate("campaign");
    res.json(contributions);
  } catch (err) {
    next(err);
  }
};
