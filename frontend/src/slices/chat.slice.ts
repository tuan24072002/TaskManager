import { createSlice } from "@reduxjs/toolkit";
import { BasicSliceState } from "./state";
import { ChatModel } from "@/model/Chat.model";

interface ChatState extends BasicSliceState {
  item: ChatModel;
  loading: boolean;
  receiver: ReceiverProps;
  mode: "big" | "small";
}

const initialState: ChatState = {
  item: ChatModel.initial(),
  loading: false,
  status: "idle",
  action: "VIE",
  receiver: "model",
  mode: "small",
};
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectItem: (state, action) => {
      state.item = action.payload;
    },
    resetState: (state) => {
      state.status = "idle";
    },
    changeAction: (state, action) => {
      state.action = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setReceiver: (state, action) => {
      state.receiver = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
  },
  extraReducers: () => {},
});
export const {
  selectItem,
  resetState,
  changeAction,
  setLoading,
  setReceiver,
  setMode,
} = chatSlice.actions;
export default chatSlice.reducer;
