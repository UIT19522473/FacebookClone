import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "../features/couter/couterSlice";
import authReduce from "../features/auth/authSlice";
import postReduce from "../features/post/postSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Chọn storage engine (local storage, AsyncStorage, ...)
const persistConfig = {
  key: "root", // key để lưu trạng thái vào storage
  storage,
};
const persistedReducer = persistReducer(persistConfig, authReduce);

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    auth: persistedReducer,
    post: postReduce,
  },
});

export const persistor = persistStore(store);
export default store;
