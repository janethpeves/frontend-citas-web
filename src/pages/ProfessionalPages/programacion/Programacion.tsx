import style from "./Programacion.module.css";
import { Calendar } from "primereact/calendar";
import calendar from "./assets/calendar.svg";
import { PiCircle } from "react-icons/pi";
export const Programacion = () => {
	return (
		<div>
			<div className={style.header}>
				<img src={calendar} className={style.titleImg} />
				<div className={style.title}>
					<label>Programación</label>
				</div>
			</div>
			<div className={style.content}>
				<div className={style.calendar__container}>
					<div className={style.calendar}>
						<Calendar
							inline
							showWeek
							style={{
								width: "100%",
								padding: "10px",
							}}
						/>
						<div className={style.date}>
							<label>Área</label>
							<div style={{ display: "flex", flexWrap: "wrap", gap: "5px", }}>
								<p className={style.card__info} style={{ backgroundColor: "#4CAF5073" }}>
									Consulta Externa General
								</p>
								<p className={style.card__info} style={{ backgroundColor: "#19A8E47D" }}>
									UCI
								</p>
								<p className={style.card__info} style={{ backgroundColor: "#E4C83173" }}>
									Emergencia
								</p>
								<p className={style.card__info} style={{ backgroundColor: "#664CAF73" }}>
									Hospitalización
								</p>
								<p className={style.card__info} style={{ backgroundColor: "#AC31E473" }}>
									Centro Obstetrico
								</p>
								<p className={style.card__info} style={{ backgroundColor: "#31E47C73" }}>
									Ayuda al diagnóstico
								</p>
							</div>
						</div>
						<div className={style.date}>
							<label>Otras Actividades</label>
							<div style={{ display: "flex", flexWrap: "wrap", gap: "5px", width: "250px" }}>
								<p className={style.card__info} style={{ backgroundColor: "#FF4E4E87" }}>
									Extras
								</p>
								<p className={style.card__info} style={{ backgroundColor: "#90909069" }}>
									Normales
								</p>
							</div>
						</div>
					</div>
				</div>
				<div>
					{info.map((item, key) => (
						<article key={key} className={style.card}>
							<div className={style.card__header}>
								<div className={style.card__date}>
									<PiCircle
										color={item.color}
										style={{ backgroundColor: item.color, borderRadius: "50%", marginRight: "10px" }}
									/>
									<span className={style.card__date__time}>{item.hour}</span>
								</div>
							</div>
							<div className={style.card__content}>
								<p>Area: <span>{item.area}</span></p>
								<p>Servicio: <span>{item.service}</span></p>
							</div>
						</article>
					))}
				</div>
			</div>
		</div>
	);
};
const info = [
	{ hour: "09:00 - 12:00", area: "CEXT", service: "Medicina General", color: "#4CAF50" },
	{ hour: "14:00 - 18:00", area: "CEXT", service: "Cirugia", color: "#7B4AFF" },
	{ hour: "09:00 - 12:00", area: "CEXT", service: "Medicina General", color: "#4CAF50" },
];
