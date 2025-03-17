const mongoose = require("mongoose");

const RewardSchema = new mongoose.Schema({
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true }, // Minimum contribution required
    backers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Reward", RewardSchema);
