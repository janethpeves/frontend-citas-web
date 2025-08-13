import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { toastSlice } from "./slices/toast/toastSlice";
import { scheduleAppointmentSlice } from "./slices/scheduleAppointmentSlice/scheduleAppointmentSlice";

export const store = configureStore({
	reducer: {
		toast: toastSlice.reducer,
		scheduleAppointment: scheduleAppointmentSlice.reducer,
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
