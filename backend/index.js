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

const addPost = async (userId, post) => {
  try {
    const user = await SocialUser.findById(userId);
    const { avatarUrl, userName, userAt } = user;

    const newPost = new SocialPosts({ avatarUrl, userName, userAt, ...post });
    const savedPost = await newPost.save();

    user.posts.push(savedPost._id);
    user.save();

    return savedPost;
  } catch (error) {
    console.log(error);
  }
};

app.post("/api/user/post", async (req, res) => {
  try {
    const post = await addPost(req.body.userId, req.body.post);
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

const likePost = async (postId, userId) => {
  try {
    const post = await SocialPosts.findById(postId);
    post.likesCount = post.likesCount + 1;
    await post.save();

    const user = await SocialUser.findById(userId);
    user.likedPosts.push(postId);
    await user.save();

    return post;
  } catch (error) {
    console.log(error);
  }
};

app.post("/api/posts/like/:postId", async (req, res) => {
  try {
    const post = await likePost(req.params.postId, req.body);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: `Post not found` });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to like a post error: ${error}` });
  }
});

const dislikePost = async (postId, userId) => {
  try {
    const post = await SocialPosts.findById(postId);
    post.likesCount = post.likesCount - 1;
    await post.save();

    const user = await SocialUser.findById(userId);
    user.likedPosts = [...user.likedPosts].filter(
      (id) => id.toString() !== postId
    );
    await user.save();

    return post;
  } catch (error) {
    console.log(error);
  }
};

app.post("/api/posts/dislike/:postId", async (req, res) => {
  try {
    const post = await dislikePost(req.params.postId, req.body);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: `Post not found` });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to dislike a post error: ${error}` });
  }
});

const deletePost = async (id) => {
  try {
    const post = await SocialPosts.findByIdAndDelete(id);
    return post;
  } catch (error) {
    console.log(error);
  }
};

app.delete("/api/user/posts/:postId", async (req, res) => {
  try {
    const post = await deletePost(req.params.postId);

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: `Post not found` });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to delete post error: ${error}` });
  }
});

const addToUserBookmarks = async (userId, postId) => {
  try {
    const user = await SocialUser.findById(userId);
    user.bookmarks.push(postId);
    await user.save();
    return user.bookmarks;
  } catch (error) {
    console.log(error);
  }
};

app.post("/api/users/bookmark/:postId/", async (req, res) => {
  try {
    const post = await addToUserBookmarks(req.body, req.params.postId);

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: `Post not found` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to bookmark a post error: ${error}` });
  }
});

const getUserBookmarks = async (userId) => {
  try {
    const user = await SocialUser.findById(userId).populate("bookmarks");
    return user.bookmarks;
  } catch (error) {
    console.log(error);
  }
};

app.get("/api/users/bookmark", async (req, res) => {
  try {
    const bookmarks = await getUserBookmarks(req.body);

    if (bookmarks) {
      res.json(bookmarks);
    } else {
      res.status(404).json({ error: `bookmarks not found` });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get bookmarks error: ${error}` });
  }
});

const removeUserBookmark = async (userId, postId) => {
  try {
    const user = await SocialUser.findById(userId);
    user.bookmarks = [...user.bookmarks].filter(
      (id) => id.toString() !== postId
    );
    await user.save();
    return user.bookmarks;
  } catch (error) {
    console.log(error);
  }
};

app.post("/api/users/remove-bookmark/:postId", async (req, res) => {
  try {
    const bookmarks = await removeUserBookmark(req.body, req.params.postId);

    if (bookmarks) {
      res.json(bookmarks);
    } else {
      res.status(404).json({ error: `bookmark not found` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to remove bookmark error: ${error}` });
  }
});

const getAllUsers = async () => {
  try {
    const users = await SocialUser.find();
    return users;
  } catch (error) {
    console.log(error);
  }
};

app.get("/api/users", async (req, res) => {
  try {
    const users = await getAllUsers();

    if (users && users.length > 0) {
      res.json(users);
    } else {
      res.status(404).json({ error: `users not found` });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get users error: ${error}` });
  }
});

const addUsers = async (usersData) => {
  try {
    const users = [];
    for (let i = 0; i < usersData.length; i++) {
      const newUser = new SocialUser(usersData[i]);
      const savedUser = await newUser.save();
      users.push(savedUser);
    }
    return users;
  } catch (error) {
    console.log(error);
  }
};

app.post("/api/users", async (req, res) => {
  try {
    const users = await addUsers(req.body);

    if (users && users.length > 0) {
      res.json(users);
    } else {
      res.status(404).json({ error: `users not found` });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get users error: ${error}` });
  }
});

const followUser = async (userId, followUserId) => {
  try {
    const user = await SocialUser.findById(userId);
    user.following.push(followUserId);
    await user.save();

    const followUser = await SocialUser.findById(followUserId);
    followUser.followers.push(userId);
    await followUser.save();

    return user.following;
  } catch (error) {
    console.log(error);
  }
};

app.post("/api/users/follow/:followUserId", async (req, res) => {
  try {
    const user = await followUser(req.body, req.params.followUserId);

    if (user && user.length > 0) {
      res.json(user);
    } else {
      res.status(404).json({ error: `user not found` });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to follow user error: ${error}` });
  }
});

const unFollowUser = async (userId, followUserId) => {
  try {
    const user = await SocialUser.findById(userId);
    user.following = [...user.following].filter(
      (id) => followUserId.toString() !== id
    );
    await user.save();

    const followUser = await SocialUser.findById(followUserId);
    followUser.followers = [...followUser.following].filter(
      (id) => userId.toString() !== id
    );
    await followUser.save();

    return user.following;
  } catch (error) {
    console.log(error);
  }
};

app.post("/api/users/unfollow/:followUserId", async (req, res) => {
  try {
    const user = await unFollowUser(req.body, req.params.followUserId);

    if (user && user.length > 0) {
      res.json(user);
    } else {
      res.status(404).json({ error: `user not found` });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to follow user error: ${error}` });
  }
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});
