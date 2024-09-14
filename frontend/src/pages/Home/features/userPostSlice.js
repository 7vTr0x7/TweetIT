import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const readPosts = createAsyncThunk("readPosts", async (id) => {
  try {
    if (id) {
      const res = await fetch(
        `http://localhost:4000/api/users/user/posts/${id}`
      );

      if (!res.ok) {
        console.log("Failed to get user");
      }

      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
});

export const editPost = createAsyncThunk(
  "editPost",
  async ({ postId, description }) => {
    try {
      if (postId) {
        const res = await fetch(
          `http://localhost:4000/api/posts/edit/${postId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ description: description }),
          }
        );

        if (!res.ok) {
          console.log("Failed to get user");
        }

        const data = await res.json();
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const userPostSlice = createSlice({
  name: "userPosts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    updatePosts: (state, action) => {
      return {
        ...state,
        posts: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(readPosts.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(readPosts.fulfilled, (state, action) => {
      state.status = "Success";
      state.posts = action.payload;
    });
    builder.addCase(readPosts.rejected, (state, action) => {
      state.status = "error";
    });
    builder.addCase(editPost.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      state.status = "Success";
    });
    builder.addCase(editPost.rejected, (state, action) => {
      state.status = "error";
    });
  },
});

export const { updatePosts } = userPostSlice.actions;

export default userPostSlice.reducer;
