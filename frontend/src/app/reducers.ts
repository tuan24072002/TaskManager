import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "@/slices/auth.slice";
import appSlice from "@/slices/app.slice";
import dashboardSlice from "@/slices/dashboard.slice";
import taskSlice from "@/slices/task.slice";
import userSlice from "@/slices/user.slice";
import chatSlice from "@/slices/chat.slice";
import notificationSlice from "@/slices/notification.slice";

const rootReducer = combineReducers({
  auth: authSlice,
  app: appSlice,
  dashboard: dashboardSlice,
  task: taskSlice,
  user: userSlice,
  chat: chatSlice,
  notification: notificationSlice,
});
export default rootReducer;
