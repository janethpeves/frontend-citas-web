import { useAppDispatch } from "@/store/hooks";
import { setToast } from "@/store/slices/toast/toastSlice";

export const showError = (errors: { [key: string]: string }) => {
	const dispatch = useAppDispatch();
	const primaryError = Object.keys(errors)[0];
	if (primaryError) {
		dispatch(
			setToast({
				severity: "error",
				summary: "Error",
				detail: errors[primaryError],
			})
		);
	}
};
