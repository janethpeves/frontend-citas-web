import { useState } from "react";
import style from "./Servicios.module.css";
import { ReporteIndicadores } from "./Steps/ReporteIndicadores/ReporteIndicadores";

import report from "./assets/reportes.svg";
import { TipoIndicador } from "./Steps/TipoIndicador/TipoIndicador";
import { Indicador } from "./Steps/Indicador/Indicador";

export const Servicios = () => {
	const [steps, setSteps] = useState(1);
	const [, setData] = useState("");
	const onReturn = () => {
		if (steps !== 1) {
			setSteps(steps - 1);
		}
	};
	return (
		<div>
			<div className={style.content}>
				<div className={style.header}>
					<div style={{ display: "flex", gap: "5px" }}>
						<img src={report} style={{ paddingBottom: "40px" }} />
						<div className={style.title}>
							<label>Reporte de Indicadores</label>
						</div>
					</div>
					<div onClick={() => onReturn()} className={style.button}>
						Regresar
					</div>
				</div>
				{steps === 1 && <ReporteIndicadores setStep={setSteps} setData={setData} />}
				{steps === 2 && <TipoIndicador setStep={setSteps} setData={setData} />}
				{steps === 3 && <Indicador  />}
			</div>
		</div>
	);
};
