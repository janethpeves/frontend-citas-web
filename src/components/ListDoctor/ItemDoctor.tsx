/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import style from "./ListDoctor.module.css";
import starIcon from "@/assets/icons/star.svg";
import heartBlue from "@/assets/icons/heart__blue.svg";

interface ItemDoctorProps {
  doctor: any;
  isSelected: boolean;
  onSelect: () => void;
}

export const ItemDoctor: React.FC<ItemDoctorProps> = ({ doctor, isSelected, onSelect }) => {
  return (
    <div 
      className={`${style.item__list} ${isSelected ? style.selected : ""}`}
      onClick={onSelect}
    >
      <img className={style.img} src={doctor.img} alt="" />
      <div className={style.txt__container}>
        <span
          className={style.txt__name}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {doctor.name} <img src={heartBlue} alt="" />
        </span>
        <span className={style.txt__spec}>
          {doctor.spec} | {doctor.location}
        </span>
        <span className={style.txt__valoracion}>
          <img style={{ marginRight: "5px" }} src={starIcon} alt="" />
          {doctor.score} ({doctor.numReseñas} Reseñas)
        </span>
      </div>
    </div>
  );
};
