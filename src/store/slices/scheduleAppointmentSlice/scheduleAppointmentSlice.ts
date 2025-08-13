import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateProps {
	Actcod: string;
	Actespcod: string;
	Cupo: string;
	Fecha: string;
	Hora: string;
	Id: string | number;
	Perasisnom: string;
	Perasisdocidennum: string;
	Plancod: string;
	Plandes: string;
	Regcod: string;
	Segcod: string;
	Servhoscod: string;
	ServHosDes: string;
	Tarprodcod: string;
	Tipdocidenpercod: string;
	Tiptarcod: string;
	Turhorfin: string;
	Turhorini: string;
	Urlcall: string;
	Usupaccod: string | number | null;
	Tipoaten: string;
}

const initialState: InitialStateProps = {
	Actcod: "",
	Actespcod: "",
	Cupo: "",
	Fecha: "",
	Hora: "",
	Id: "",
	Perasisnom: "",
	Perasisdocidennum: "",
	Plancod: "",
	Plandes: "",
	Regcod: "",
	Segcod: "",
	Servhoscod: "",
	ServHosDes: "",
	Tarprodcod: "",
	Tipdocidenpercod: "",
	Tiptarcod: "",
	Turhorfin: "",
	Turhorini: "",
	Urlcall: "",
	Usupaccod: "",
	Tipoaten: "", // Tipo de atención (1: Presencial, 2: Virtual) ==> 1 | 2
};
export const scheduleAppointmentSlice = createSlice({
	name: "scheduleAppointment",
	initialState,
	reducers: {
		setState: (state, action: PayloadAction<Partial<InitialStateProps>>) => {
			return { ...state, ...action.payload };
		},
		clearState: () => {
			return initialState;
		},
	},
});

export const { setState, clearState } = scheduleAppointmentSlice.actions;
export default scheduleAppointmentSlice.reducer;
