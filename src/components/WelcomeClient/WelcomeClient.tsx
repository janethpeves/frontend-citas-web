// import useAuthStore from "@/store/slices/auth/useAuthStore";
import style from "./WelcomeClient.module.css";
import doctorIcon from "@/assets/icons/doctor__welcome.svg";

export const WelcomeClient = () => {
  // const { PacName } = useAuthStore();
  const PacName = "Juan Perez";
  return (
    <div className={style.welcome__container}>
      <div className={style.content__wrapper}>
        <div className={style.text__group}>
          <div className={style.name__container}>
            <span className={style.greeting}>Buenos Dias,</span>
            <span className={style.name}>{PacName?.toLocaleLowerCase()}</span>
          </div>
          <p className={style.message}>¡Esperamos que tenga un buen día!</p>
        </div>
        <div className={style.image__wrapper}>
          <img
            className={style.img__doctor}
            src={doctorIcon}
            alt="doctor welcome"
          />
        </div>
      </div>
    </div>
  );
};
