import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

export const invitedCallSlice = createSlice({
  name: "invitedCall",
  initialState,
  reducers: {
    openInvitedCall: (state) => {
      state.open = true;
    },
    closeInvitedCall: (state) => {
      state.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openInvitedCall, closeInvitedCall } = invitedCallSlice.actions;

export default invitedCallSlice.reducer;
