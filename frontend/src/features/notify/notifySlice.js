import { createSlice } from "@reduxjs/toolkit";
// import { signIn } from "./authAsync";

const initialState = {
  listNotify: [],
};

export const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    addNotify: (state, action) => {
      state.listNotify = [...state.listNotify, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNotify } = notifySlice.actions;

export default notifySlice.reducer;
