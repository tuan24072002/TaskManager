import { AuthService } from "@/services/Auth.service";
import { createSlice } from "@reduxjs/toolkit";
import { BasicSliceState } from "./state";
import { commonCreateAsyncThunk } from "./thunk";
import { errorMessage } from "@/utils/utils";
import { HttpService } from "@/services/http/HttpService";

export const loginCall: any = commonCreateAsyncThunk({
  type: "signin/login",
  action: AuthService.login,
});
export const registerCall: any = commonCreateAsyncThunk({
  type: "signin/register",
  action: AuthService.register,
});
interface AuthState extends BasicSliceState {
  remember: boolean;
  authorized: boolean;
  statusRegister: "idle" | "loading" | "completed" | "failed";
}
const initialState: AuthState = {
  remember: false,
  authorized: false,
  status: "idle",
  statusRegister: "idle",
  error: "",
  success: "",
  action: "VIE",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
    resetStatusRegister: (state) => {
      state.statusRegister = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginCall.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginCall.fulfilled, (state, action) => {
        state.status = "completed";
        const data = action.payload.data.data;
        localStorage.setItem("accessToken", data.tokens.accessToken);
        HttpService.setToken(data.tokens.accessToken);
        localStorage.setItem("refreshToken", data.tokens.refreshToken);
        HttpService.setLocalRefToken(data.tokens.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        state.authorized = true;
      })
      .addCase(loginCall.rejected, (state, action) => {
        state.status = "failed";
        const error = Object(action.payload);
        state.error = errorMessage(error);
      })
      .addCase(registerCall.pending, (state) => {
        state.statusRegister = "loading";
      })
      .addCase(registerCall.fulfilled, (state, action) => {
        state.statusRegister = "completed";
        state.success =
          action.payload.data !== "" ? action.payload.data.message : "";
      })
      .addCase(registerCall.rejected, (state, action) => {
        state.statusRegister = "failed";
        const error = Object(action.payload);
        state.error = errorMessage(error);
      });
  },
});
export const { resetStatus, resetStatusRegister } = authSlice.actions;
export default authSlice.reducer;
