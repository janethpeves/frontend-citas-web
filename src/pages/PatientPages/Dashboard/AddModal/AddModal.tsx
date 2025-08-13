import React from "react";
import style from "./AddModal.module.css";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import moment from "moment";

interface PropsAddModal {
  onHideModal?: () => void;
  data: any;
}

export const AddModal = ({ onHideModal, data }: PropsAddModal) => {
  const handleClickModalContainer = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  console.log(data);
  return (
    <>
      <div className={style.modalOverlay} onClick={onHideModal}>
        <div
          className={style.modalContainer}
          onClick={handleClickModalContainer}
        >
          <div className={style.insuranceInfo}>
            <div>
              <div className={style.insuranceLabel}>
                <span>Aseguradora</span>
              </div>
              <div className={style.insuranceValue}>Paciente particular</div>
            </div>
            <div>
              <div className={style.insuranceLabel}>
                <span>Importe</span>
              </div>
              <div className={style.amount}>
                <span>S/ 220.00</span>
              </div>
            </div>
          </div>

          <div className={style.detailsSection}>
            <div className={style.detailItem}>
              <span>Especialidad</span>
              <p>{data ? data?.Servicio : ""}</p>
            </div>
            <div className={style.detailItem}>
              <span>Medico</span>
              <p>{data ? data?.Medico : ""}</p>
            </div>
            <div className={style.detailItem}>
              <span>Fecha</span>
              <p>
                <FaCalendarAlt />{" "}
                {data?.Fecha ? moment(data?.Fecha).format("DD-MM-YYYY") : ""}
              </p>
            </div>
            <div className={style.detailItem}>
              <span>Hora</span>
              <p>
                <FaClock /> {data?.Hora ? data?.Hora : ""}
              </p>
            </div>
            <div className={style.detailItem}>
              <span>Ubicación</span>
              <p>
                <FaMapMarkerAlt /> {data ? data?.Centro : ""}
              </p>
            </div>
            <div className={style.detailItem}>
              <span>Tipo de cita</span>
              <p>{data ? data?.TipoAten : ""}</p>
            </div>
            <div className={style.detailItem}>
              <span>Consultorio</span>
              <p>{data?.Url.length === 0 ? data?.Consultorio : data?.Url}</p>
            </div>
            <div className={style.detailItem}>
              <span>Comprobante</span>
              <p>
                <a href="#" className={style.downloadLink}>
                  Descargar
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
