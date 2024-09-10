const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./db/db.connection");
const SocialPosts = require("./models/post.model");
const SocialUser = require("./models/user.model");

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

initializeDatabase();

const getPosts = async () => {
  try {
    const posts = await SocialPosts.find();
    return posts;
  } catch (error) {
    console.log(error);
  }
};

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await getPosts();

    if (posts && posts.length > 0) {
      res.json(posts);
    } else {
      res.status(404).json({ error: `Posts not found` });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get posts error: ${error}` });
  }
});
