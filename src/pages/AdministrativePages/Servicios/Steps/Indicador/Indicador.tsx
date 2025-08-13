import style from "./Indicador.module.css";
import { Dropdown } from "primereact/dropdown";
import graphic from "./assets/graphic.svg";
import { PiCircle } from "react-icons/pi";
export const Indicador = () => {
	return (
		<div>
			<div className={style.content}>
				<div className={style.dropdown}>
					<label>Periocidad de Medición: </label>
					<Dropdown
						name=""
						value={""}
						onChange={() => {}}
						width={250}
						placeholder="Selecciona un mes"
					/>
				</div>
				<div>
					<img src={graphic} alt="" width={500} height={200} />
					<div className={style.info}>
						<label>Criterio de Aceptación</label>
						<div className={style.leyenda}>
							<p>
								<span>
									<PiCircle
										color={"#90BE6D"}
										style={{ backgroundColor: "#90BE6D", borderRadius: "50%" }}
									/>
								</span>{" "}
								4 Consultas x Hora
							</p>
							<p>
								<span>
									<PiCircle
										color={"#F9C74F"}
										style={{ backgroundColor: "#F9C74F", borderRadius: "50%" }}
									/>
								</span>{" "}
								3{" "}
							</p>
							<p>
								<span>
									<PiCircle
										color={"#F94144"}
										style={{ backgroundColor: "#F94144", borderRadius: "50%" }}
									/>
								</span>{" "}
								{" < 3"}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
