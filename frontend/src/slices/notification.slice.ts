import { createSlice } from "@reduxjs/toolkit";
import { ActionSliceState } from "./state";
import { NotificationModel } from "@/model/Notification.model";
import { commonCreateAsyncThunk } from "./thunk";
import { NotificationService } from "@/services/Notification.service";
import { errorMessage } from "@/utils/utils";

interface NotificationState extends ActionSliceState {
  item: NotificationModel;
  list: NotificationModel[];
  loading: boolean;
}

const initialState: NotificationState = {
  item: NotificationModel.initial(),
  list: [],
  loading: false,
  status: "idle",
  statusAction: "idle",
  action: "VIE",
};
export const getNotificationList: any = commonCreateAsyncThunk({
  type: "notification/getNotificationList",
  action: NotificationService.getNotificationList,
});
export const markNotificationRead: any = commonCreateAsyncThunk({
  type: "notification/markNotificationRead",
  action: NotificationService.markNotificationRead,
});
export const notificationSlice = createSlice({
  name: "notification",
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotificationList.fulfilled, (state, action) => {
        const list = NotificationService.listFromJson(
          action.payload.data !== "" ? action.payload.data.data : []
        );
        state.list = list;
        state.status = "completed";
      })
      .addCase(getNotificationList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNotificationList.rejected, (state, action) => {
        state.status = "failed";
        const error = Object(action.payload);
        state.error = errorMessage(error);
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        state.success =
          action.payload.data != "" ? action.payload.data.message : "";
        const list = NotificationService.listFromJson(
          action.payload.data !== "" ? action.payload.data.data : []
        );
        state.list = list;
        state.statusAction = "completed";
      })
      .addCase(markNotificationRead.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(markNotificationRead.rejected, (state, action) => {
        state.statusAction = "failed";
        const error = Object(action.payload);
        state.error = errorMessage(error);
      });
  },
});
export const { selectItem, resetState, changeAction, setLoading } =
  notificationSlice.actions;
export default notificationSlice.reducer;
