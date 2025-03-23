import { AuthService } from "@/services/Auth.service";
import { setLogined } from "@/slices/app.slice";
import { Action, Dispatch } from "@reduxjs/toolkit";

export const customMiddleware =
  ({ dispatch }: { dispatch: Dispatch<Action> }) =>
  (next: (arg0: any) => void) =>
  (action: any) => {
    if (action.payload) {
      const { message } = action.payload;
      if (message) {
        if (
          message === "Invalid refresh token!" ||
          message === "Refresh token is expired!" ||
          message === "Token is no longer valid!"
        ) {
          dispatch(setLogined(false));
          AuthService.logout();
          window.location.replace("/");
          return;
        }
      }
    }
    next(action);
  };
