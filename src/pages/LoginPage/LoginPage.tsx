import { useEffect, useState } from "react";
// import ReCAPTCHA from "react-google-recaptcha";

import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import bg__img from "@/assets/img/image.png";
import style from "./LoginPage.module.css";
import logo from "@/assets/icons/logo__k_salud.svg";

import { PrimeModal } from "@/components/PrimeComponents/PrimeModal/PrimeModal";
import { useModal } from "@/hooks/useModal";
import { Checkbox } from "primereact/checkbox";

import * as Yup from "yup";
import { useFormik } from "formik";

import { usePostFetch } from "@/hooks/usePostFetch";

import { TermsAndConditions } from "./modalTermsAndConditions/TermsAndConditions";

interface loginProps {
  User: string;
  Password: string;
}

const initialValues: loginProps = {
  User: "",
  Password: "",
};

const options = [
  { id: "UsuPerDir", name: "Directivo", value: "Administrative" as typeUi },
  { id: "UsuPerAsi", name: "Profesional", value: "Professional" as typeUi },
  { id: "UsuPerPac", name: "Paciente", value: "Patient" as typeUi },
];

export const LoginPage = () => {
  const modalTerms = useModal();
  const navigate = useNavigate();
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
      await postFetchData.postFetchData(loginData);
    },
    validationSchema: Yup.object({
      User: Yup.string().required("Usuario Requerido"),
      Password: Yup.string().required("Contraseña Requerida"),
    }),
  });

  useEffect(() => {
    if (postFetchData.response?.Code === "000") {
      let countRoles = 0;

      if (postFetchData.response?.UsuPerPac == 1) {
        console.log("Paciente");
        countRoles++;
      }
      if (postFetchData.response?.UsuPerAsi == 1) {
        console.log("Profesional");
        countRoles++;
      }
      if (postFetchData.response?.UsuPerDir == 1) {
        console.log("Directivo");
        countRoles++;
      }

      if (countRoles === 1) {
        navigate("/home");
        console.log("Tiene un rol");
      } else if (countRoles > 1) {
        navigate("/home");
        console.log("Tiene mas de un rol");
      } else {
        navigate("/home");
        console.log("No tiene ningun rol");
      }
    }
  }, [postFetchData.response]);

  return (
    <form noValidate onSubmit={handleSubmit} className={style.login}>
      <img className={style.bg__img} src={bg__img} alt="background" />

      <div className={style.container__form__login}>
        <img className={style.logo} src={logo} alt="Logo" />
        <div className={style.container__form}>
          <h2 className={style.txt__welcome}>Bienvenido de vuelta</h2>

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
      </div>
      <PrimeModal
        header=""
        onHideModal={modalTerms.onHideModal}
        modalStatus={modalTerms.modalStatus}
      >
        <TermsAndConditions onHideModal={modalTerms.onHideModal} />
      </PrimeModal>
    </form>
  );
};
