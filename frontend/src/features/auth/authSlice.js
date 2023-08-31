import { createSlice } from "@reduxjs/toolkit";
import { signIn } from "./authAsync";

const initialState = {
  isLoading: false,
  success: false,
  mes: "",
  data: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },

  //    Code logic xử lý async action
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(signIn.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(signIn.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.success = true;
      state.data = action.payload?.metadata || null;
      state.mes = "login success";
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(signIn.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.success = false;
      state.data = null;
      state.mes = "login fail";
    });
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default authSlice.reducer;
