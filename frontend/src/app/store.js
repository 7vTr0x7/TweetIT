import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../pages/Profile/userSlice";
import postReducer from "../pages/Home/features/userPostSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
  },
});

export default store;
