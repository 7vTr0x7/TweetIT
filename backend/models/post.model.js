const mongoose = require("mongoose");

const SocialPostSchema = new mongoose.Schema({}, { timestamps: true });

const SocialPosts = mongoose.model("SocialPost", SocialPostSchema);

module.exports = SocialPosts;
