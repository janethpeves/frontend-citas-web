/* eslint-disable @typescript-eslint/no-explicit-any */
import style from "./ReporteIndicadores.module.css";

interface Props {
	setStep: (step: number) => void;
	setData: (data: any) => void;
}
export const ReporteIndicadores = ({ setStep, setData }: Props) => {
	const onClick = (data: any) => {
		setData((prev: any) => {
			return {
				...prev,
				name: data,
			};
		});
		setStep(2);
	};
	return (
		<div>
			<div className={style.content}>
				{data.map((item, key) => (
					<div
						key={key}
						className={style.card}
						onClick={() => {
							onClick(item.name);
						}}
					>
						<p>{item.name}</p>
					</div>
				))}
			</div>
		</div>
	);
};
const data = [
	{ name: "Consulta Externa" },
	{ name: "Hospitalización" },
	{ name: "Emergencia" },
	{ name: "Centro Quirurgico" },
	{ name: "Centro Obstetrico" },
	{ name: "Diagnostico por imagen" },
];
