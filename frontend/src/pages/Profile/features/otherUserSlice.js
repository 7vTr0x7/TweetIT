import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const readOtherUser = createAsyncThunk("readUser", async (userId) => {
  try {
    const res = await fetch(
      `https://tweet-it-backend.vercel.app/api/users/user/id/${userId}`
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

const otherUserSlice = createSlice({
  name: "otherUser",
  initialState: {
    user: {},
    error: null,
    status: "pending",
  },
  reducers: {},
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

export default otherUserSlice.reducer;
