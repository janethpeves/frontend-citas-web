// store.ts
// Cambiar a redux
import { create } from "zustand";

interface AuthState {
  token: string | null;
  kibLevel?: typeUi;
  usuCod?: string | null;
  PacName?: string | null;
  login: (token: string, newUsuCod: string, PacName: string) => void;
  setUi: (kibLevel: typeUi) => void;
  logout: () => void;
}

// const useAuthStore = create<AuthState>((set) => ({
// 	token: localStorage.getItem("rt__kib_citas"),
// 	kibLevel: localStorage.getItem("rt__kib_level") as typeUi,
// 	usuCod: localStorage.getItem("rt_kib_usucod"),
// 	PacName: localStorage.getItem("pacname"),

// 	login: (newToken, newUsuCod, PacName) => {
// 		localStorage.setItem("rt__kib_citas", newToken);
// 		localStorage.setItem("rt_kib_usucod", newUsuCod);
// 		localStorage.setItem("pacname", PacName);
// 		set({ token: newToken, usuCod: newUsuCod, PacName });
// 	},
// 	setUi: (value) => {
// 		if (value) localStorage.setItem("rt__kib_level", value);
// 		set({ kibLevel: value });
// 	},
// 	logout: () => {
// 		localStorage.removeItem("rt__kib_citas");
// 		localStorage.removeItem("rt_kib_usucod");
// 		localStorage.removeItem("rt__kib_level");
// 		localStorage.removeItem("pacname");
// 		localStorage.removeItem("data");
// 		set({ token: null, usuCod: null, kibLevel: null, PacName: null });
// 	},
// }));

const useAuthStore = create<AuthState>((set) => ({
  token: "token123",
  kibLevel: "" as typeUi,
  // kibLevel: "Patient",
  //   kibLevel: "Professional",
  // kibLevel: "Administrative",
  usuCod: localStorage.getItem("rt_kib_usucod"),
  PacName: localStorage.getItem("pacname"),

  login: (newToken, newUsuCod, PacName) => {
    set({ token: newToken, usuCod: newUsuCod, PacName });
  },
  setUi: (value) => {
    if (value) localStorage.setItem("rt__kib_level", value);
    set({ kibLevel: value });
  },
  logout: () => {
    set({ token: null, usuCod: null, kibLevel: null, PacName: null });
  },
}));

export default useAuthStore;
