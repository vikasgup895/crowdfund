
const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    goalAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    backers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
    deadline: { type: Date, required: true },
    status: { type: String, enum: ["Active", "Completed", "Failed"], default: "Active" },
    imageUrl: { type: String, required: true }, // New field for image URL
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Campaign", CampaignSchema);
