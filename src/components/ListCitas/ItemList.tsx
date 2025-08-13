/* eslint-disable @typescript-eslint/no-explicit-any */
import style from "./ListCitas.module.css";
import document__read from "../../assets/icons/document__read.svg";
import { Button } from "primereact/button";
export const ItemList = ({ data }:any) => {
  return (
    <div className={style.item__list}>
      <div>
        <div>
          <span className={style.prop}>Medico: </span>
          <span className={style.value}>{data?.medico}</span>
        </div>
        <div>
          <span className={style.prop}>Especialidad: </span>
          <span className={style.value}>{data?.espec}</span>
        </div>
        <div>
          <span className={style.prop}>Fecha: </span>
          <span className={style.value}>{data?.date}</span>
        </div>
      </div>
      <div>
        <Button className={style.button}>
          <img src={document__read} alt="" />
        </Button>
      </div>
    </div>
  );
};
