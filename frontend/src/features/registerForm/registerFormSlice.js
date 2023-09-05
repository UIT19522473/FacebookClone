import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

export const registerFormSlice = createSlice({
  name: "registerForm",
  initialState,
  reducers: {
    openRegisterForm: (state) => {
      state.open = true;
    },
    closeRegisterForm: (state) => {
      state.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openRegisterForm, closeRegisterForm } =
  registerFormSlice.actions;

export default registerFormSlice.reducer;
