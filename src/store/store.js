// store.js
import { configureStore } from "@reduxjs/toolkit";
import { userInfoReducer } from "./userSlice";

const store = configureStore({
  reducer: {
    userInfoStore: userInfoReducer,
  },
});

export default store;
