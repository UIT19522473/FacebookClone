import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  openMembers: {
    open: false,
    infoGroup: null,
  },
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

    openGroupChatMembers: (state, action) => {
      state.openMembers.open = true;
      state.openMembers.infoGroup = action.payload;
    },
    closeGroupChatMembers: (state) => {
      state.openMembers.open = false;
      state.openMembers.infoGroup = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  openCreateGroupChat,
  closeCreateGroupChat,
  openGroupChatMembers,
  closeGroupChatMembers,
} = createGroupChatSlice.actions;

export default createGroupChatSlice.reducer;
