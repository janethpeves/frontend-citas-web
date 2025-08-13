import { useNavigate } from "react-router-dom";
import style from "./Dashboard.module.css";
import info from "./assets/info.svg";
import calendar from "./assets/calendar.svg";
import people from "./assets/people.svg";

import { Divider } from "primereact/divider";
import { BsClock } from "react-icons/bs";
import { BiCamera } from "react-icons/bi";

export const MedicalDashboard = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className={style.body}>
				<div className={style.content}>
					<h1 className={style.content__title}>Servicios</h1>
					{data.map((data, index) => (
						<article key={index} className={style.card} onClick={() => navigate(data.href)}>
							<div className={style.card__img}>
								<img className={style.img} src={data.img} alt={data.title} />
							</div>
							<section className={style.card__content}>
								<h4 className={style.title}>{data.title}</h4>
								<span className={style.description}>{data.desc}</span>
								<div className={style.dateContainer}>
									<p className={style.updated}>{data.updated}</p>
									<label className={style.date}>{data.date}</label>
								</div>
							</section>
						</article>
					))}
				</div>
				<div className="{style.content}>">
					<Divider layout="vertical" style={{ width: "15px" }} />
				</div>
				<div className={style.content}>
					<h1 className={style.content__title}>Próximos pacientes</h1>
					<div className={style.content}>
						{patients.map((info, key) => (
							<article key={key} className={style.patients__card}>
								<div className={style.patients__card__info}>
									<p>Fecha:</p>
									<span> {info.date}</span>
								</div>
								<div className={style.patients__card__info}>
									<p>Nombre:</p>
									<span> {info.name}</span>
								</div>
								<div className={style.patients__card__appointment}>
									<span className={style.patients__card__appointment_info}>
										<BsClock />{" "}
										<span>{info.hour}</span>
									</span>
									<span className={style.patients__card__appointment_info}>
										<BiCamera />{" "}
										<span>{info.type}</span>
									</span>
								</div>
							</article>
							// <div key={key}>
							// 	<p className={style.date}>{info.date}</p>
							// 	<div className={style.patients__card}>
							// 		<p>{info.name}</p>
							// 		<p>
							// 			<span>
							// 				<BsClock />{" "}
							// 			</span>
							// 			{info.hour}
							// 		</p>
							// 		<p>
							// 			<span>
							// 				<BiCamera />{" "}
							// 			</span>
							// 			{info.type}
							// 		</p>
							// 	</div>
							// </div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};
const patients = [
	{
		date: "Viernes 22 de Octubre",
		name: "Carlos Marino Perez",
		hour: "9:00 Am",
		type: "Cita Virtual",
	},
	{
		date: "Viernes 22 de Octubre",
		name: "Carlos Marino Perez",
		hour: "9:00 Am",
		type: "Cita Virtual",
	},
	{
		date: "Viernes 22 de Octubre",
		name: "Carlos Marino Perez",
		hour: "9:00 Am",
		type: "Cita Virtual",
	},
];
const data = [
	{
		img: calendar,
		title: "Programación",
		desc: "Programación mensual del profesional.",
		date: "05, Mayo",
		updated: "Ultima Actualización",
		href: "/programacion",
	},
	{
		img: info,
		title: "Consulta Externa",
		desc: "Relación de pacientes por dia..",
		date: "05, Mayo",
		updated: "Ultima Actualización",
		href: "/pacientes",
	},
	{
		img: people,
		title: "Hospitalización",
		desc: "Relación de pacientes atendidos en hospitalización.",
		date: "05, Mayo",
		updated: "Ultima Actualización",
		href: "/hospitalizacion",
	},
];
