/* eslint-disable @typescript-eslint/no-explicit-any */
import style from "./TipoIndicador.module.css";
interface Props {
	setStep(step: number): void;
	setData(data: any): void;
}
export const TipoIndicador = ({ setStep, setData }: Props) => {
	const onClick = (data: any) => {
		setData((prev: any) => {
			return {
				...prev,
				desc: data,
			};
		});
		setStep(3);
	};
	return (
		<div className={style.content}>
			{data.map((item, key) => (
				<div
					key={key}
					onClick={() => {
						onClick(item.description);
					}}
                    className={style.card}
				>
					<p>{item.description}</p>
				</div>
			))}
		</div>
	);
};
const data = [
	{ description: "Productividad Hora Médico en UPSS - Consulta Externa" },
	{ description: "Rendimiento Hora Médico en UPSS - Consulta Externa" },
	{ description: "Ausentismo del Paciente Citado" },
	{ description: "Utilización de los Consultorios Médicos" },
];
