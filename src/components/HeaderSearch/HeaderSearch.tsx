import style from "./HeaderSearch.module.css";
import { InputSearch } from "@/components/InputSearch/InputSearch";
import { ButtonAddCita } from "@/components/ButtonAddCita/ButtonAddCita";
import { Profile } from "@/components/Profile/Profile";
import { useNavigate } from "react-router-dom";
// import useAuthStore from "@/store/slices/auth/useAuthStore";

interface Props {
  isHidden?: boolean;
}

export const HeaderSearch = ({ isHidden }: Props) => {
  const navigate = useNavigate();
  // const { PacName } = useAuthStore();
  const PacName = "Test";

  return (
    <div className={style.header__container}>
      <div
        className={style.left_section}
        style={{ display: isHidden ? "none" : "flex" }}
      >
        <div className={style.desktop_input_wrapper}>
          <InputSearch placeholder={"Buscar cita"} width="300px" />
        </div>

        <ButtonAddCita onClick={() => navigate("agendar-cita")} />
      </div>

      <div className={style.right_section}>
        <div className={style.mobile_input_wrapper}>
          <InputSearch placeholder={"Buscar cita"} width="180px" />
        </div>
        <Profile nameUser={PacName} />
      </div>
    </div>
  );
};
