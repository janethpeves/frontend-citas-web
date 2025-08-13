/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./Indicadores.module.css";

const Indicadores = ({ onSelectIndicador }: any) => {
	const indicadores = [
		"Productividad Hora Medico en UPSS Consulta Externa",
		"Rendimiento Hora Medico en UPSS Consulta Externa",
		"Ausentismo del Paciente Citado",
		"Utilizacion de los Consultorios Medicos",
	];

	return (
		<div className={styles.container}>
			<h2>Reporte de Indicadores</h2>
			{indicadores.map((indicador, index) => (
				<div key={index} className={styles.card} onClick={() => onSelectIndicador(indicador)}>
					{indicador}
				</div>
			))}
		</div>
	);
};

export default Indicadores;
