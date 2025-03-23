import { createSlice } from "@reduxjs/toolkit";

export interface AppState {
  logined: boolean;
  isSidebarOpen: boolean;
  user: any;
}

const initialState: AppState = {
  logined: false,
  isSidebarOpen: false,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setOpenSidebar(state, action) {
      state.isSidebarOpen = action.payload;
    },
    setLogined(state, action) {
      state.logined = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});
export const { setOpenSidebar, setLogined, setUser } = appSlice.actions;
export default appSlice.reducer;
