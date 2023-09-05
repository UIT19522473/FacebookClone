import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

export const createPostSlice = createSlice({
  name: "createPost",
  initialState,
  reducers: {
    openCreatePost: (state) => {
      state.open = true;
    },
    closeCreatePost: (state) => {
      state.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openCreatePost, closeCreatePost } = createPostSlice.actions;

export default createPostSlice.reducer;
