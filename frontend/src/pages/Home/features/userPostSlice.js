import { createSlice } from "@reduxjs/toolkit";

const userPostSlice = createSlice({
  name: "userPosts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
});
