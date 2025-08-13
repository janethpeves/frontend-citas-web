import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import styles from "./DetalleIndicador.module.css";
import indicatorImg from "@/assets/svg/indicatorImg.svg";

const DetalleIndicador = ({ indicador = "", onBack = () => {} }) => {
	const [mesSeleccionado, setMesSeleccionado] = useState(null);
	const meses = [
		{ label: "Enero", value: "Enero" },
		{ label: "Febrero", value: "Febrero" },
		{ label: "Marzo", value: "Marzo" },
		{ label: "Abril", value: "Abril" },
	];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleMesChange = (e: any) => {
		setMesSeleccionado(e?.value);
	};

	return (
		<div className={styles.container}>
			<h2>{indicador}</h2>
			<div className={styles.dropdownContainer}>
				<label htmlFor="mes" className={styles.label}>
					Periodidad de medición
				</label>
				<Dropdown
					id="mes"
					value={mesSeleccionado}
					options={meses}
					onChange={handleMesChange}
					placeholder="Selecciona un mes"
					className={styles.dropdown}
				/>
			</div>
			{mesSeleccionado && (
				<div className={styles.hola}>
					<img src={indicatorImg} alt="indicador" />
				</div>
			)}

			{/* Botón de regresar */}
			<button onClick={onBack} className={styles.backButton}>
				Regresar
			</button>
		</div>
	);
};

export default DetalleIndicador;
