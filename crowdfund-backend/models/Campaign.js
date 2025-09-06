// models/Campaign.js
const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    goalAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    deadline: Date,
    category: String,
    imageUrl: String,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "completed", "expired"],
      default: "active",
    },
    totalBackers: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Pre-save middleware to automatically update status
campaignSchema.pre("save", function (next) {
  if (this.status === "active") {
    const now = new Date();

    // Check if deadline has passed
    if (new Date(this.deadline) < now) {
      this.status = "expired";
    }
    // Check if goal is reached
    else if (this.currentAmount >= this.goalAmount) {
      this.status = "completed";
    }
  }
  next();
});

module.exports = mongoose.model("Campaign", campaignSchema);
