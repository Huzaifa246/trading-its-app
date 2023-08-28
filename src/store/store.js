// store.js
import { configureStore } from "@reduxjs/toolkit";
import { userInfoReducer } from "./userSlice";
import { layOutReducer } from "./withDrawSlice";

const store = configureStore({
  reducer: {
    userInfoStore: userInfoReducer,
    withDrawStore: layOutReducer,
  },
});

export default store;
