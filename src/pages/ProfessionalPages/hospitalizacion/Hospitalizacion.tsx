import style from "./Hospitalizacion.module.css";
import DataTable from "@/components/DataTable/DataTable";
import people from "./assets/people.svg";
import { ChangeEvent, useState } from "react";

import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { usePostFetch } from "@/hooks/usePostFetch";

export const Hospitalizacion = () => {
	const [formState, setFormState] = useState({
		Usutipdociden: "", // 1 DNI,
		Usudocidennum: "",
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement> | DropdownChangeEvent) => {
		setFormState((prev) => {
			return {
				...prev,
				[e.target.name]: e.target.value,
			};
		});
	};

	const { postFetchData } = usePostFetch('/hospitalized');

	const handleSubmit = async () => {
		try {
			const res = await postFetchData(formState, undefined, undefined, false);
			if (res.status)
				console.log(res);
		} catch (err) {
			console.log(err);
		}
		setFormState({
			Usutipdociden: "",
			Usudocidennum: "",
		})
	}

	return (
		<div>
			<div className={style.content}>
				<div className={style.header}>
					<img src={people} style={{ paddingBottom: "40px" }} />
					<div className={style.title}>
						<label>Hospitalizacion</label>
					</div>
				</div>
				<div>
					<Dropdown
						name="Usudocidennum"
						onChange={handleChange}
						value={formState.Usudocidennum}
						placeholder="Tipo de Documento: "
						options={options}
						optionLabel="name"
						optionValue="value"
					/>
					<InputText
						name="Usudocidennum"
						onChange={handleChange}
						value={formState.Usudocidennum}
						placeholder="Número de Documento: "
					/>
					<button onClick={handleSubmit}>Buscar</button>
				</div>
				<DataTable data={data} columns={columns} />
			</div>
		</div>
	);
};


const options = [{ name: "DNI", value: "1" }];

const columns = [
	{ field: "", header: "" },
	{ field: "names", header: "Nombres" },
	{ field: "lastnames", header: "Apellidos" },
	{ field: "servicio", header: "Servicio" },
	{ field: "habitacion", header: "Habitación" },
	{ field: "cama", header: "Cama" },
	{ field: "date", header: "Fecha" },
];

const data = [
	{
		names: "Carlos Jose",
		lastnames: "Marino Perez",
		servicio: "Odontologico",
		habitacion: "202",
		cama: "2",
		date: "Viernes 22 de Octubre",
	},
	{
		names: "Carlos Jose",
		lastnames: "Marino Perez",
		servicio: "Odontologico",
		habitacion: "202",
		cama: "2",
		date: "Viernes 22 de Octubre",
	},
	{
		names: "Carlos Jose",
		lastnames: "Marino Perez",
		servicio: "Odontologico",
		habitacion: "202",
		cama: "2",
		date: "Viernes 22 de Octubre",
	},
];
