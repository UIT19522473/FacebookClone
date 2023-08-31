import { createSlice } from "@reduxjs/toolkit";
import { submitPost, getAllPosts } from "./postAsync";

const initialState = {
  isLoading: false,
  success: false,
  mes: "",
  data: [],
  postCurrent: null,
};

export const postSlice = createSlice({
  name: "post",
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
    builder.addCase(submitPost.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(submitPost.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.success = true;
      state.postCurrent = action.payload.metadata.post || null;
      state.mes = "add post success";
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(submitPost.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.success = false;
      state.postCurrent = null;
      state.mes = "add post fail";
    });

    //async when get all posts
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(getAllPosts.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.success = true;
      // state.data = [action.payload.metadata.post, ...state.data] || [];
      state.data = action.payload.metadata.post;
      state.mes = "get posts success";
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(getAllPosts.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.success = false;
      state.data = null;
      state.mes = "get posts fail";
    });
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default postSlice.reducer;
