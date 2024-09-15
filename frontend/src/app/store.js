import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../pages/Profile/userSlice";
import postReducer from "../pages/Home/features/userPostSlice";
import allPostsReducer from "../pages/Explore/postsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    allPosts: allPostsReducer,
  },
});

export default store;
