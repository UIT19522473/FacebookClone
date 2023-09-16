import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMess: [],
};

export const chatPrivateSlice = createSlice({
  name: "chatPrivate",
  initialState,
  reducers: {
    addToAllMess: (state, action) => {
      state.allMess = [...state.allMess, action.payload];
    },

    removeCacheMess: (state, action) => {
      // Xóa các phần tử có userSend hoặc userReceive có _id
      const { idSend, idReceive } = action.payload;
      state.allMess = state.allMess.filter((message) => {
        return (
          message.userSend?._id !== idSend &&
          message.userSend?._id !== idReceive &&
          message.userReceive?._id !== idSend &&
          message.userReceive?._id !== idReceive
        );
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToAllMess, removeCacheMess } = chatPrivateSlice.actions;

export default chatPrivateSlice.reducer;
