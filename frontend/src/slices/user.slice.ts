import { createSlice } from "@reduxjs/toolkit";
import { ActionSliceState } from "./state";
import { UserModel } from "@/model/User.model";
import { commonCreateAsyncThunk } from "./thunk";
import { UserService } from "@/services/User.service";
import { errorMessage } from "@/utils/utils";

interface UserState extends ActionSliceState {
  list: UserModel[];
  item: UserModel;
  loading: boolean;
  statusChangePass: "idle" | "loading" | "completed" | "failed";
}

const initialState: UserState = {
  list: [],
  item: UserModel.initial(),
  loading: false,
  status: "idle",
  statusAction: "idle",
  action: "INS",
  statusChangePass: "idle",
};

export const fetchAllTeam: any = commonCreateAsyncThunk({
  type: "user/getAll",
  action: UserService.getTeam,
});
export const updateUserProfile: any = commonCreateAsyncThunk({
  type: "user/updateUserProfile",
  action: UserService.updateUserProfile,
});
export const deleteUserProfile: any = commonCreateAsyncThunk({
  type: "user/deleteUserProfile",
  action: UserService.deleteUserProfile,
});
export const activateUserProfile: any = commonCreateAsyncThunk({
  type: "user/activateUserProfile",
  action: UserService.activateUserProfile,
});
export const changeUserPassword: any = commonCreateAsyncThunk({
  type: "user/changeUserPassword",
  action: UserService.changeUserPassword,
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    selectItem: (state, action) => {
      state.item = action.payload;
    },
    resetChangePassState: (state) => {
      state.statusChangePass = "idle";
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
      .addCase(fetchAllTeam.fulfilled, (state, action) => {
        const list = UserService.listFromJson(
          action.payload.data !== "" ? action.payload.data.data : []
        );
        state.list = list;
        state.status = "completed";
      })
      .addCase(fetchAllTeam.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllTeam.rejected, (state, action) => {
        state.status = "failed";
        const error = Object(action.payload);
        state.error = errorMessage(error);
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.success =
          action.payload.data != "" ? action.payload.data.message : "";
        const user = JSON.parse(localStorage.getItem("user") as string);
        if (
          user &&
          action.payload.data &&
          user._id === action.payload.data.data._id
        ) {
          localStorage.setItem(
            "user",
            JSON.stringify(action.payload.data.data)
          );
        }
        state.statusAction = "completed";
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.statusAction = "failed";
        const error = Object(action.payload);
        state.error = errorMessage(error);
      })
      .addCase(changeUserPassword.fulfilled, (state, action) => {
        state.success =
          action.payload.data != "" ? action.payload.data.message : "";
        state.statusChangePass = "completed";
      })
      .addCase(changeUserPassword.pending, (state) => {
        state.statusChangePass = "loading";
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.statusChangePass = "failed";
        const error = Object(action.payload);
        state.error = errorMessage(error);
      })
      .addCase(deleteUserProfile.fulfilled, (state, action) => {
        state.success =
          action.payload.data != "" ? action.payload.data.message : "";
        state.statusAction = "completed";
      })
      .addCase(deleteUserProfile.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(deleteUserProfile.rejected, (state, action) => {
        state.statusAction = "failed";
        const error = Object(action.payload);
        state.error = errorMessage(error);
      })
      .addCase(activateUserProfile.fulfilled, (state, action) => {
        state.success =
          action.payload.data != "" ? action.payload.data.message : "";
        state.statusAction = "completed";
      })
      .addCase(activateUserProfile.pending, (state) => {
        state.statusAction = "loading";
      })
      .addCase(activateUserProfile.rejected, (state, action) => {
        state.statusAction = "failed";
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
  resetChangePassState,
} = userSlice.actions;
export default userSlice.reducer;
