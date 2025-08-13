import { createRoot } from "react-dom/client";

import "primeicons/primeicons.css";

import App from "@/App";

import "primereact/resources/themes/lara-light-cyan/theme.css";

import "@/index.css";
import { store } from "@/store/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
	//<StrictMode>
	<Provider store={store}>
		<App />
	</Provider>
	//</StrictMode>,
);
