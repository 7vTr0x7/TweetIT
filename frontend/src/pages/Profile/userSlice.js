import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const readUser = createAsyncThunk("readUser", async () => {
  try {
    const res = await fetch(
      "http://localhost:4000/api/users/user/66e183147b64fafc1e2fa38a"
    );

    if (!res.ok) {
      console.log("Failed to get user");
    }

    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(readUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default userSlice.reducer;
