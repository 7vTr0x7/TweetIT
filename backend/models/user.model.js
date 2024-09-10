const mongoose = require("mongoose");

const socialUserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userAt: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SocialUser",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SocialUser",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
      },
    ],
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
      },
    ],
    likedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
      },
    ],
  },
  { timestamps: true }
);

const SocialUser = mongoose.model("SocialUser", socialUserSchema);

module.exports = SocialUser;
