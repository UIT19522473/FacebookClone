import { createSlice } from "@reduxjs/toolkit";
import { getGroupChat } from "./chatGroupAsync";

const initialState = {
  isLoading: false,
  success: false,
  mes: "",
  data: null,
  allMess: [],
};

export const chatGroupSlice = createSlice({
  name: "groupChat",
  initialState,
  reducers: {
    addToAllMessGroup: (state, action) => {
      state.allMess = [...state.allMess, action.payload];
    },

    removeCacheMessGroup: (state, action) => {
      // Xóa các phần tử có userSend hoặc userReceive có _id
      const { idGroupChat } = action.payload;
      state.allMess = state.allMess.filter((message) => {
        return message.idGroupChat !== idGroupChat;
      });
    },
  },

  //    Code logic xử lý async action
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(getGroupChat.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(getGroupChat.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.success = true;
      state.data = action.payload?.metadata || null;
      state.mes = "login success";
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(getGroupChat.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.success = false;
      state.data = null;
      state.mes = "login fail";
    });
  },
});

// Action creators are generated for each case reducer function
export const { addToAllMessGroup, removeCacheMessGroup } =
  chatGroupSlice.actions;

export default chatGroupSlice.reducer;
