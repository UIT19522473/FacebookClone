import { createSlice } from "@reduxjs/toolkit";
import { getUsers } from "./searchAsync";

const initialState = {
  isLoading: false,
  success: false,
  mes: "",
  data: [],
};

export const searchSlice = createSlice({
  name: "search",
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
    //async when add a post
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(getUsers.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(getUsers.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.success = true;
      state.data = action.payload.metadata || [];
      state.mes = "search success";
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(getUsers.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.success = false;
      state.data = [];
      state.mes = "search fail";
    });
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default searchSlice.reducer;
