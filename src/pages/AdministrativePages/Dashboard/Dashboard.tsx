import { useNavigate } from "react-router-dom";
import style from "./Dashboard.module.css";
import info from "./assets/info.svg";

export const AdministrativeDashboard = () => {
	const navigate = useNavigate();
	return (
		<div>
			<div className={style.content}>
				<h1 className={style.content__title}>Servicios</h1>
				{data.map((data, index) => (
					<div key={index} className={style.card} onClick={() => navigate(data.href)}>
						<div className={style.card__img}>
							<img src={data.img} className={style.img} />
						</div>
						<div className={style.content}>
							<div className={style.title__div}>
								<div className={style.title}>
									<p>{data.title}</p>
								</div>
							</div>
							<div className={style.description}>{data.desc}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const data = [
	{
		img: info,
		title: "Reporte de Indicadores",
		desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. .",
		href: "/servicios",
	},
];
