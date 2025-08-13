import { AppRoutes } from "@/routes/AppRoutes";
import { Toast } from "primereact/toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useRef } from "react";
import { clearToast } from "@/store/slices/toast/toastSlice";
import { addLocale, locale } from "primereact/api";
import { localeSetting } from "./settings/locale";


function App() {
	addLocale("es", localeSetting);
	locale("es");

	const dispatch = useAppDispatch();
	const toast = useRef<Toast>(null);
	const { severity, summary, detail } = useAppSelector((state) => state.toast.toastConfig);
	useEffect(() => {
		if (summary) {
			toast?.current?.show({ severity, summary, detail, life: 5000 });
			dispatch(clearToast());
		}
	}, [severity, summary, detail]);
	return (
		<>
			<Toast ref={toast} />
			<AppRoutes />
		</>
	);
}

export default App;
