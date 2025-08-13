import { useState } from "react";
import style from "./Profile.module.css";

import profileIcon from "@/assets/icons/Profile.svg";
import { BiUser } from "react-icons/bi";
import { GiPadlock } from "react-icons/gi";
import { FaMars, FaVenus } from "react-icons/fa";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Divider } from "primereact/divider";
import useAuthStore from "@/store/slices/auth/useAuthStore";

export const Profile = () => {
  const [state, setState] = useState(1);
  const [selectedGender, setSelectedGender] = useState<
    "hombre" | "mujer" | null
  >(null);
  const { PacName } = useAuthStore();
  const name = PacName?.toLocaleLowerCase().split(", ");

  const handleGenderSelect = (gender: "hombre" | "mujer") => {
    setSelectedGender(gender);
    // Hay que actualizar el backend con el nuevo genero :)
  };

  return (
    <div>
      <div className={style.body}>
        <h1 className={style.title}>Configuración de perfil</h1>
        <div className={style.container}>
          <div className={style.items}>
            <div
              className={style.item}
              onClick={() => {
                setState(1);
              }}
            >
              <BiUser fontSize={"50"} />
              <p>Configuración de perfil</p>
            </div>
            <div
              className={style.item}
              onClick={() => {
                setState(2);
              }}
            >
              <GiPadlock fontSize={"50"} />
              <p>Contraseña</p>
            </div>
          </div>
          <div className={style.content}>
            {state === 1 && (
              <>
                <div className={style.config__img}>
                  <div className={style.container__img}>
                    <img
                      src={profileIcon}
                      alt=""
                      className={style.profileIcon}
                    />
                  </div>
                </div>
                <div className={style.content__inputs}>
                  <div className={style.inputs}>
                    <FloatLabel>
                      <InputText
                        id="nombre"
                        value={name?.[1] || ""}
                        onChange={() => {}}
                        disabled
                        style={{ textTransform: "capitalize" }}
                      />
                      <label htmlFor="nombre">Nombre</label>
                    </FloatLabel>
                    <FloatLabel>
                      <InputText
                        id="apellidos"
                        value={name?.[0] || ""}
                        onChange={() => {}}
                        disabled
                        style={{ textTransform: "capitalize" }}
                      />
                      <label htmlFor="apellidos">Apellidos</label>
                    </FloatLabel>
                    <label className={style.genderLabel}>Género</label>
                    <div className={style.genderButtons}>
                      <button
                        type="button"
                        className={`${style.genderButton} ${selectedGender === "hombre" ? style.selected : ""}`}
                        onClick={() => handleGenderSelect("hombre")}
                        aria-label="Seleccionar genero masculino"
                        aria-pressed={selectedGender === "hombre"}
                      >
                        <FaMars /> Hombre
                      </button>
                      <button
                        type="button"
                        className={`${style.genderButton} ${selectedGender === "mujer" ? style.selected : ""}`}
                        onClick={() => handleGenderSelect("mujer")}
                        aria-label="Seleccionar genero femenino"
                        aria-pressed={selectedGender === "mujer"}
                      >
                        <FaVenus /> Mujer
                      </button>
                    </div>
                  </div>
                  <div className={style.inputs}>
                    <FloatLabel>
                      <InputText id="email" value={""} onChange={() => {}} />
                      <label htmlFor="email">Email</label>
                    </FloatLabel>
                    <FloatLabel>
                      <InputText id="numero" value={""} onChange={() => {}} />
                      <label htmlFor="numero">Número de telefono</label>
                    </FloatLabel>
                  </div>
                </div>

                <div className={style.button}>
                  <Button label="Guardar Cambios" />
                </div>
              </>
            )}
            {state === 2 && (
              <>
                <div className={style.content__inputs}>
                  <div
                    className={style.inputs}
                    style={{ flexDirection: "row" }}
                  >
                    <FloatLabel>
                      <InputText
                        id="actualEmail"
                        value={""}
                        onChange={() => {}}
                      />
                      <label htmlFor="actualEmail">Email</label>
                    </FloatLabel>
                    <FloatLabel>
                      <InputText
                        id="actualPassword"
                        value={""}
                        onChange={() => {}}
                      />
                      <label htmlFor="actualPassword">Contraseña</label>
                    </FloatLabel>
                  </div>
                </div>
                <Divider />
                <div className={style.content__inputs}>
                  <div className={style.inputs}>
                    <FloatLabel>
                      <InputText id="email" value={""} onChange={() => {}} />
                      <label htmlFor="email">Email</label>
                    </FloatLabel>
                    <FloatLabel>
                      <InputText id="password" value={""} onChange={() => {}} />
                      <label htmlFor="password">Contraseña</label>
                    </FloatLabel>
                  </div>
                  <div className={style.inputs}>
                    <FloatLabel>
                      <InputText id="code" value={""} onChange={() => {}} />
                      <label htmlFor="code">Código</label>
                    </FloatLabel>
                    <FloatLabel>
                      <InputText id="repeat" value={""} onChange={() => {}} />
                      <label htmlFor="repeat">Repetir Contraseña</label>
                    </FloatLabel>
                  </div>
                </div>
                <div className={style.button}>
                  <Button label="Cambiar Contraseña" />
                  <Button
                    label="Enviar Código"
                    style={{
                      background: "#EEEEEE",
                      color: "#3F3F3F",
                      border: "none",
                      marginLeft: "15px",
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
