const mongoose = require("mongoose");

const SocialPostSchema = new mongoose.Schema(
  {
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
