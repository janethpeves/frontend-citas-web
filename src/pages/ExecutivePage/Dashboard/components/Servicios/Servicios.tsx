/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './Servicios.module.css'; 
import reporteIndicator from "@/assets/svg/reporteIndicator.svg"
const Servicios = ({ onSelectServicio }: any) => {
  return (
    <div className={styles.serviciosContainer}>
      <h2>Servicios</h2>
      <div className={styles.card} onClick={onSelectServicio}>
        <div className={styles.icono}>
        <img src={reporteIndicator} alt="reporteIndicator" />

        </div>
        <div>
          <h3>Reporte de Indicadores</h3>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
      </div>
    </div>
  );
};

export default Servicios;
