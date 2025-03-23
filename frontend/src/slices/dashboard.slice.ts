import { createSlice } from "@reduxjs/toolkit";
import { ActionSliceState } from "./state";
import { DashboardModel } from "@/model/Dashboard.model";
import { commonCreateAsyncThunk } from "./thunk";
import { DashboardService } from "@/services/Dashboard.service";
import { errorMessage } from "@/utils/utils";

interface DashboardState extends ActionSliceState {
  item: DashboardModel;
  loading: boolean;
}

const initialState: DashboardState = {
  item: DashboardModel.initial(),
  loading: false,
  status: "idle",
  statusAction: "idle",
  action: "INS",
};

export const fetchAll: any = commonCreateAsyncThunk({
  type: "dashboard/getAll",
  action: DashboardService.getAll,
});

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    selectItem: (state, action) => {
      state.item = action.payload;
    },
    resetActionState: (state) => {
      state.statusAction = "idle";
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
      .addCase(fetchAll.fulfilled, (state, action) => {
        const item =
          action.payload.data !== ""
            ? action.payload.data.data
            : DashboardModel.initial();
        state.item = item;
        state.status = "completed";
      })
      .addCase(fetchAll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAll.rejected, (state, action) => {
        state.status = "failed";
        const error = Object(action.payload);
        state.error = errorMessage(error);
      });
  },
});
export const {
  selectItem,
  resetActionState,
  resetState,
  changeAction,
  setLoading,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
