import { useRef } from "react";
import style from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { OverlayPanel } from "primereact/overlaypanel";
import icon from "./assets/notify.svg";
import profileIcon from "@/assets/icons/Profile.svg";
import { BsCircle } from "react-icons/bs";

interface ProfileProps {
  nameUser: string | null | undefined;
}

export const Profile = ({ nameUser }: ProfileProps) => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const op: any = useRef(null);

  const handleProfileClick = () => {
    navigate("/perfil");
  };

  return (
    <div className={style.container__profile}>
      <div className={style.notify}>
        <img
          src={icon}
          onClick={(e) => op?.current?.toggle(e)}
          alt="notifications"
        />
        <OverlayPanel ref={op}>
          {notify.map((data, key) => (
            <div className={style.card} key={key}>
              <div>
                <BsCircle
                  className={style.color}
                  style={{ color: data.color, backgroundColor: data.color }}
                />
              </div>
              <div className={style.content}>
                <label>
                  {data.title}, <a href={data.href}>Ver detalle</a>
                </label>
                <p>{data.time}</p>
              </div>
            </div>
          ))}
        </OverlayPanel>
      </div>
      <div className={style.container__text}>
        <span className={style.name__profile}>
          {nameUser?.toLocaleLowerCase()}
        </span>
        <a className={style.link__profile} onClick={handleProfileClick}>
          Ver perfil
        </a>
      </div>
      <div className={style.container__img} onClick={handleProfileClick}>
        <img src={profileIcon} alt="profile" className={style.profileIcon} />
      </div>
    </div>
  );
};
const notify = [
  {
    title: "Tienes Citas pendiente de pago",
    href: "",
    time: "Hace 2 minutos",
    color: "#FFB573",
  },
  {
    title: "No asistio a su Cita programada el 17 de octubre",
    href: "",
    time: "Hace 45 min.",
    color: "#FF4E4E",
  },
  {
    title: "Tienes una cita pendite de pago proxima a vencer",
    href: "",
    time: "Hace 55 min.",
    color: "#FF4E4E",
  },
  {
    title: "Tienes una cita programada para el 19 de octubre",
    href: "",
    time: "Hace una hora.",
    color: "#4CAF50",
  },
];
