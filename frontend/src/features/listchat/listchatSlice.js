import { createSlice } from "@reduxjs/toolkit";
// import { signIn } from "./authAsync";

const initialState = {
  display: [],
  hidden: [],
};

export const listchatSlice = createSlice({
  name: "listchat",
  initialState,
  reducers: {
    addDisplay: (state, action) => {
      const checkDisplay = state.display.find(
        (item) => item?._id === action.payload._id
      );

      //   const checkHidden = state.hidden.find(
      //     (item) => item?._id === action.payload._id
      //   );

      if (!checkDisplay) {
        // if (checkHidden) {
        // Xóa phần tử khỏi hidden
        state.hidden = state.hidden.filter(
          (item) => item?._id !== action.payload._id
        );
        // }
        // Thêm vào mảng display, giới hạn chỉ tối đa 3 phần tử
        if (state.display.length < 3) {
          state.display = [action.payload, ...state.display];
        } else {
          // Nếu đã có 3 phần tử, di chuyển phần tử cuối cùng vào mảng hidden
          state.hidden = [state.display[2], ...state.hidden];
          state.display = [action.payload, ...state.display.slice(0, 2)];
        }
      }
    },
    removeDisplay: (state, action) => {
      state.display = state.display.filter(
        (item) => item?._id !== action.payload._id
      );
    },

    addHidden: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // Xóa phần tử khỏi hidden
      state.display = state.display.filter(
        (item) => item?._id !== action.payload._id
      );
      state.hidden = [action.payload, ...state.hidden];
    },
    removeHidden: (state, action) => {
      state.hidden = state.hidden.filter(
        (item) => item?._id !== action.payload._id
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addDisplay, addHidden, removeDisplay, removeHidden } =
  listchatSlice.actions;

export default listchatSlice.reducer;
