const mongoose = require("mongoose");

const SocialPostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SocialUser",
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    likesCount: {
      type: Number,
      required: true,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SocialUser",
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SocialUser",
        },
        comment: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const SocialPosts = mongoose.model("SocialPosts", SocialPostSchema);

module.exports = SocialPosts;
