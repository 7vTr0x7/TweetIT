const mongoose = require("mongoose");

const SocialPostSchema = new mongoose.Schema(
  {
    user: {
      avatarUrl: {
        type: String,
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
      userAt: {
        type: String,
        required: true,
      },
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
