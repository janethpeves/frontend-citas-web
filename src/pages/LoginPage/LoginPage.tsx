import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Checkbox } from "primereact/checkbox";
// import ReCAPTCHA from "react-google-recaptcha";
import style from "./LoginPage.module.css";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { useModal } from "@/hooks/useModal";
import { usePostFetch } from "@/hooks/usePostFetch";

import { PrimeModal } from "@/components/PrimeComponents/PrimeModal/PrimeModal";
import { TermsAndConditions } from "./modalTermsAndConditions/TermsAndConditions";

import bg__img from "@/assets/img/image.png";
import logo from "@/assets/icons/logo__k_salud.svg";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAuth, setRole } from "@/store/slices/auth/authSlice";

interface loginProps {
  User: string;
  Password: string;
}

const initialValues: loginProps = {
  User: "",
  Password: "",
};

const rolesOption = [
  { id: "UsuPerDir", name: "Directivo", value: "Administrative" },
  { id: "UsuPerAsi", name: "Profesional", value: "Professional" },
  { id: "UsuPerPac", name: "Paciente", value: "Patient" },
];

export const LoginPage = () => {
  const modalTerms = useModal();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, role } = useAppSelector((state) => state.auth);
  const [selectedRole, setSelectedRole] = useState<string>("");

  const postFetchData = usePostFetch("/AppMobil/login");

  const { values, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      const loginData = {
        GetLoginRequest: {
          OriCenAsiCod: "1",
          CenAsiCod: "100",
          User: values.User,
          Password: values.Password,
        },
      };
      const response = await postFetchData.postFetchData(loginData);
      dispatch(setAuth(response));
    },
    validationSchema: Yup.object({
      User: Yup.string().required("Usuario Requerido"),
      Password: Yup.string().required("Contraseña Requerida"),
    }),
  });

  return (
    <form noValidate onSubmit={handleSubmit} className={style.login}>
      <img className={style.bg__img} src={bg__img} alt="background" />

      <div className={style.container__form__login}>
        <img className={style.logo} src={logo} alt="Logo" />

        {!role && !user && (
          <div className={style.container__form}>
            <h2 className={style.txt__welcome}>Bienvenido</h2>

            <div className={style.form__login}>
              <InputText
                id="user"
                name="User"
                value={values.User}
                onChange={handleChange}
                className={style.input__line}
                placeholder="usuario"
                type="text"
                onBlur={handleBlur}
              />
              <InputText
                id="password"
                type="password"
                name="Password"
                value={values.Password}
                onChange={handleChange}
                className={style.input__line}
                placeholder="contraseña"
                onBlur={handleBlur}
              />

              {/* <div className={style.captcha}>
      <ReCAPTCHA
        sitekey="AAAA"
        onChange={onChange}
        style={{ paddingTop: "15px" }}
      />
    </div> */}

              <div className={style.terms}>
                <Checkbox value name="" onChange={() => {}} checked />
                <label>
                  He leído y acepto los terminos y condiciones establecidos{" "}
                  <span
                    className={style.link}
                    onClick={modalTerms.onVisibleModal}
                  >
                    aquí
                  </span>
                </label>
              </div>
              <Button
                type="submit"
                label="Iniciar Sesion"
                className={style.button}
                style={{
                  marginTop: "20px",
                  backgroundColor: "rgba(25, 168, 228, 1)",
                  borderColor: "rgba(25, 168, 228, 1)",
                }}
              />
            </div>
          </div>
        )}

        {!role && user && (
          <div>
            <h2 className={style.txt__welcome}>Elige un perfil</h2>
            <div style={{ display: "flex", gap: "10px" }}>
              {postFetchData.response?.UsuPerAsi == 1 && (
                <div
                  className={
                    selectedRole === "Professional"
                      ? style.button__role__selected
                      : style.button__role
                  }
                  onClick={() => setSelectedRole("Professional")}
                >
                  <div>Profesional</div>
                </div>
              )}
              {postFetchData.response?.UsuPerDir == 1 && (
                <div
                  className={
                    selectedRole === "Administrative"
                      ? style.button__role__selected
                      : style.button__role
                  }
                  onClick={() => setSelectedRole("Administrative")}
                >
                  <div>Directivo</div>
                </div>
              )}
              {postFetchData.response?.UsuPerPac == 1 && (
                <div
                  className={
                    selectedRole === "Patient"
                      ? style.button__role__selected
                      : style.button__role
                  }
                  onClick={() => setSelectedRole("Patient")}
                >
                  <div>Paciente</div>
                </div>
              )}
            </div>

            <Button
              label="Iniciar Sesion"
              className={style.button}
              style={{
                marginTop: "20px",
                backgroundColor: "rgba(25, 168, 228, 1)",
                borderColor: "rgba(25, 168, 228, 1)",
              }}
              onClick={() => {
                dispatch(setRole(selectedRole));
                navigate("/home");
              }}
            />
          </div>
        )}
      </div>

      <PrimeModal
        header="Términos y Condiciones"
        onHideModal={modalTerms.onHideModal}
        modalStatus={modalTerms.modalStatus}
      >
        <TermsAndConditions onHideModal={modalTerms.onHideModal} />
      </PrimeModal>
    </form>
  );
};
