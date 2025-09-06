const mongoose = require("mongoose");

const contributionSchema = new mongoose.Schema(
  {
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    backer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    message: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contribution", contributionSchema);
