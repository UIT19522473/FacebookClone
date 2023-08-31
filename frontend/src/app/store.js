import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "../features/couter/couterSlice";
import authReduce from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    auth: authReduce,
  },
});
