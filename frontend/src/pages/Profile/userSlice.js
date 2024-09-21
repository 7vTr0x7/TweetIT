import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const readUser = createAsyncThunk("readUser", async () => {
  try {
    const res = await fetch(
      "https://tweet-it-backend.vercel.app/api/users/user/id/66e183147b64fafc1e2fa38a"
    );

    if (!res.ok) {
      console.log("Failed to get user");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
});
export const editUser = createAsyncThunk("editUser", async ({ userData }) => {
  try {
    const res = await fetch(
      "https://tweet-it-backend.vercel.app/api/users/user/edit/66e183147b64fafc1e2fa38a",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!res.ok) {
      console.log("Failed to get user");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    error: null,
    status: "pending",
  },
  reducers: {
    userLike: (state, action) => {
      const posts = [...state.user.likedPosts, action.payload];
      return {
        ...state,
        user: { ...state.user, likedPosts: posts },
      };
    },
    userDisLike: (state, action) => {
      const posts = state.user.likedPosts.filter(
        (post) => post !== action.payload
      );
      return {
        ...state,
        user: { ...state.user, likedPosts: posts },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(readUser.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(readUser.fulfilled, (state, action) => {
      state.status = "Success";

      state.user = action.payload;
    });
    builder.addCase(readUser.rejected, (state, action) => {
      state.status = "Failed";
    });
    builder.addCase(editUser.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.status = "Success";
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.status = "Failed";
    });
  },
});

export const { userDisLike, userLike } = userSlice.actions;
export default userSlice.reducer;
