import { Divider } from "primereact/divider";
import style from "./DetailModal.module.css";
import { FaCalendar, FaClock, FaFile, FaTypo3, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
export const DetailModal = () => {
	return (
		<div>
			<div className={style.detail__div}>
				<div>
					<p>Aseguradora</p>
					<label>Paciente Particular</label>
				</div>f
				<div>
					<p>Importe</p>
					<label>S/ 220.00</label>
				</div>
			</div>
            <div className={style.content}>
                <div className={style.items}>
                    <div className={style.item}>
                        <label>Especialidad <FaFile/></label>
                        <p>Cardiologo</p>
                    </div>
                    <div className={style.item}>
                        <label>Especialidad <FaUser/></label>
                        <p>Sanchez Gabriela</p>
                    </div>
                </div>
                <Divider/>
                <div className={style.items} >
                    <div className={style.item}>
                        <label>Fecha <FaCalendar/></label>
                        <p>19/08/2024</p>
                    </div>
                    <div className={style.item}>
                        <label>Hora <FaClock/></label>
                        <p>08:00 AM</p>
                    </div>
                </div>
                <Divider/>
                <div className={style.items}>
                    <div className={style.item}>
                        <label>Ubicación <FaLocationDot/></label>
                        <p>Sede San borja</p>
                    </div>
                    <div className={style.item}>
                        <label>Tipo de cita <FaTypo3/></label>
                        <p>Presencial</p>
                    </div>
                </div>
                <Divider/>
                <div className={style.items}>
                    <div className={style.item}>
                        <label>Consultorio</label>
                        <p>505</p>
                    </div>
                    <div className={style.item}>
                        <label>Comprobante <br/></label>
                        <a>Descargar</a>
                    </div>
                </div>
            </div>
		</div>
	);
};
