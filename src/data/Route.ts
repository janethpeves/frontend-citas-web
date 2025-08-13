// import logoIcon from "@/assets/icons/Sidebar/logo.svg";
import calendarIcon from "@/assets/icons/Sidebar/calendar.svg";
import elementsIcon from "@/assets/icons/Sidebar/elements.svg";
import documentsIcon from "@/assets/icons/Sidebar/document.svg";
import squareGrid from "@/assets/icons/Sidebar/square_grid.svg";
import people from "@/assets/icons/people.svg";
import patients from "@/assets/icons/info.svg";
export const appRoutesPatient = [
	{
		icon: elementsIcon,
		title: "Mis Citas",
		path: "/",
	},
	{
		icon: calendarIcon,
		title: "Mis Atenciones",
		path: "/atenciones",
	},
	{
		icon: documentsIcon,
		title: "Recetas",
		path: "/recetas",
	},
	{
		icon: squareGrid,
		title: "Resultados",
		path: "/resultados",
	},
];
export const appRoutesProf = [
	{
		icon: elementsIcon,
		title: "Servicios",
		path: "/elementos",
	},
	{
		icon: patients,
		title: "Pacientes",
		path: "/pacientes",
	},
	{
		icon: calendarIcon,
		title: "Programación",
		path: "/programacion",
	},
	{
		icon: people,
		title: "Hospitalización",
		path: "/hospitalizacion",
	},
];

export const appRoutesDirectivo = [
	{
		icon: elementsIcon,
		title: "Servicios",
		path: "/",
	},
];
