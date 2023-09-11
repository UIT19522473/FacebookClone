import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

export const createGroupChatSlice = createSlice({
  name: "createGroupChat",
  initialState,
  reducers: {
    openCreateGroupChat: (state) => {
      state.open = true;
    },
    closeCreateGroupChat: (state) => {
      state.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openCreateGroupChat, closeCreateGroupChat } =
  createGroupChatSlice.actions;

export default createGroupChatSlice.reducer;
