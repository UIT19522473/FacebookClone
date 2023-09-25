import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "../features/couter/couterSlice";
import authReduce from "../features/auth/authSlice";
import postReduce from "../features/post/postSlice";
import createPostReduce from "../features/createPost/createPostSlice";
import registerFormReduce from "../features/registerForm/registerFormSlice";
import searchReduce from "../features/search/searchSlice";
import listChatReduce from "../features/listchat/listchatSlice";
import createGroupChatReduce from "../features/createGroupChat/createGroupChatSlice";
import chatPrivateReduce from "../features/chatPrivate/chatPriaveSlice";
import chatGroupReduce from "../features/chatGroup/chatGroupSlice";
import notifyReduce from "../features/notify/notifySlice";
import invitedCallReduce from "../features/invitedCall/invitedCallSlice";

import controllMeetingReduce from "../features/controllMeeting/controllMeetingSlice";

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
    createPost: createPostReduce,
    registerForm: registerFormReduce,
    groupChat: createGroupChatReduce,
    search: searchReduce,
    listChat: listChatReduce,
    chatPrivate: chatPrivateReduce,
    chatGroup: chatGroupReduce,
    notify: notifyReduce,
    invitedCall: invitedCallReduce,

    controllMeeting: controllMeetingReduce,
  },
});

export const persistor = persistStore(store);
export default store;
