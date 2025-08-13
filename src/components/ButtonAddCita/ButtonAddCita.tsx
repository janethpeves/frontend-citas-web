import { Button } from "primereact/button";
import style from "./ButtonAddCita.module.css";

interface ButtonAddCitaProps {
  onClick?: () => void;
}

export const ButtonAddCita = ({ onClick }:ButtonAddCitaProps) => {
  return (
    <Button
      className={style.button__cita}
      icon="pi pi-plus"
      label="Agendar cita"
      onClick={onClick}
      style={{ fontFamily: "Arial, sans-serif", fontWeight: "inherit" }}
    />
  );
};
