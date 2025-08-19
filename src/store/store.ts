import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { toastSlice } from "./slices/toast/toastSlice";
import { scheduleAppointmentSlice } from "./slices/scheduleAppointmentSlice/scheduleAppointmentSlice";
import { authSlice } from "./slices/auth/authSlice";

export const store = configureStore({
  reducer: {
    toast: toastSlice.reducer,
    scheduleAppointment: scheduleAppointmentSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
