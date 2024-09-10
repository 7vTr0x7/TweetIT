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

const addPost = async (post) => {
  try {
    const newPost = new SocialPosts(post);
    const savedPost = await newPost.save();
    return savedPost;
  } catch (error) {
    console.log(error);
  }
};

app.post("/api/user/post", async (req, res) => {
  try {
    const post = await addPost(req.body);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: `Post not found` });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to add post error: ${error}` });
  }
});

const getPostById = async (id) => {
  try {
    const post = await SocialPosts.findById(id);
    return post;
  } catch (error) {
    console.log(error);
  }
};

app.get("/api/posts/:postId", async (req, res) => {
  try {
    const post = await getPostById(req.params.postId);

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: `Post not found` });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get post error: ${error}` });
  }
});

const editPost = async (data, id) => {
  try {
    const post = new SocialPosts.findByIdAndUpdate(id, data, { new: true });

    return post;
  } catch (error) {
    console.log(error);
  }
};

app.post("/api/posts/edit/:postId", async (req, res) => {
  try {
    const post = await editPost(req.body, req.params.postId);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: `Post not found` });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to edit post error: ${error}` });
  }
});
