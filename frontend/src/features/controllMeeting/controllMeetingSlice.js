import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  camera: false,
  mic: false,
  call: false,
};

export const controllMeetingSlice = createSlice({
  name: "controllMeeting",
  initialState,
  reducers: {
    openCamera: (state) => {
      state.camera = true;
    },
    closeCamera: (state) => {
      state.camera = false;
    },

    openMic: (state) => {
      state.mic = true;
    },
    closeMic: (state) => {
      state.mic = false;
    },

    openCall: (state) => {
      state.call = true;
    },
    closeCall: (state) => {
      state.call = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  openCall,
  openCamera,
  openMic,
  closeCall,
  closeCamera,
  closeMic,
} = controllMeetingSlice.actions;

export default controllMeetingSlice.reducer;
