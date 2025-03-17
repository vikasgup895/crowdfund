const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", CommentSchema);
