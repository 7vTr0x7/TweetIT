import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../pages/Profile/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
