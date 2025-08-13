import style from "./Patients.module.css";
import DataTable from "@/components/DataTable/DataTable";
import iconPatient from "./assets/patients.svg";

import { ChangeEvent, FormEvent, useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { BiCopy } from "react-icons/bi";
import { usePostFetch } from "@/hooks/usePostFetch";
import { Tooltip } from "primereact/tooltip";

export const Patients = () => {
	const [formState, setFormState] = useState({
		Usutipdociden: "",
		Usudocidennum: "",
		Fecha: ""
	})
	const [data, setData] = useState([])
	const [error, setError] = useState<string | null>(null)

	const { postFetchData } = usePostFetch('/patients-cited');

	const handleChange = (e: ChangeEvent<HTMLInputElement> | DropdownChangeEvent) => {
		setFormState((prev) => ({
			...prev,
			[e.target.name]: String(e.target.value),
		}));
	};

	const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		try {
			const res = await postFetchData(formState)
			if (res?.error) {
				setError(res.error)
				return
			}
			const patientsData = res?.Sdtpaccitadocapp?.["sdtPacCitaDocApp.sdtPacCitaDocAppItem"] || [];
			setData(patientsData);
		} catch (error) {
			setError("Error al obtener los datos de los pacientes");
		}
	}

	return (
		<div>
			<div className={style.content}>
				<div className={style.header}>
					<img src={iconPatient} style={{ paddingBottom: "40px" }} />
					<div className={style.title}>
						<label>Pacientes del día</label>
						<p>14 de Noviembre - 2024</p>
					</div>
				</div>
				<form className={style.form} onSubmit={handleSubmit}>
					<div className={style.formGroup}>
						<Dropdown
							onChange={handleChange}
							name="Usutipdociden"
							placeholder="Tipo de Documento:"
							options={options}
							value={formState.Usutipdociden}
							optionLabel="name"
						/>
						<InputText
							onChange={handleChange}
							name="Usudocidennum"
							value={formState.Usudocidennum}
							placeholder="Número de Documento:"
						/>
					</div>
					<div className={style.formGroup}>
						<InputText
							onChange={handleChange}
							placeholder="AAAA-MM-DD"
							name="Fecha"
							value={formState.Fecha}
						/>
						<Button>Buscar</Button>
					</div>
				</form>
				<DataTable error={error} data={data} columns={columns} totalRecords={data.length} paginator />
			</div>
		</div>
	);
};

const options = [
	{ name: "DNI", value: "1" }
]

const columns = [
	{
		field: "",
		header: ""
	},
	{
		field: "Paciente",
		header: "Paciente"
	},
	{
		field: "Hora",
		header: "Hora",
		body: (rowData: any) => {
			try {
				const date = new Date(rowData.Hora);
				const options: Intl.DateTimeFormatOptions = {
					hour: "2-digit",
					minute: "2-digit",
					hour12: false,
				};
				return date.toLocaleTimeString("es-ES", options);
			} catch (err) {
				console.log(err)
			}
		}
	},
	{
		field: "Servicio",
		header: "Servicio"
	},
	{
		field: "TipoAten",
		header: "Tipo de Cita"
	},
	{
		field: "Url",
		header: "Link",
		body: (rowData: any) => {
			if (!rowData.Url) return null;
			return (
				<>
					<Button
						onClick={() => { navigator.clipboard.writeText(rowData.Url) }}
						style={{ padding: ".5rem" }}
						className="button"
					>
						<BiCopy size={20} color="#fff" />
					</Button>
					<Tooltip target=".button" content="Copiar link" position="top" />
				</>
			)
		},
	},
]


