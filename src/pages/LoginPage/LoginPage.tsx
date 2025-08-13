/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

import useAuthStore from "@/store/slices/auth/useAuthStore";

import bg__img from "@/assets/img/image.png";
import style from "./LoginPage.module.css";
import logo from "@/assets/icons/logo__k_salud.svg";

import { PrimeModal } from "@/components/PrimeComponents/PrimeModal/PrimeModal";
import { useModal } from "@/hooks/useModal";
import { Checkbox } from "primereact/checkbox";

import * as Yup from "yup";
import { useFormik } from "formik";

import { usePostFetch } from "@/hooks/usePostFetch";
import { useAppDispatch } from "@/store/hooks";
import { setToast } from "@/store/slices/toast/toastSlice";
import { showError } from "@/helpers/showError";
import { TermsAndConditions } from "./modalTermsAndConditions/TermsAndConditions";

// import { useAppDispatch } from "@/store/hooks";
// import { setToast } from "@/store/slices/toast/toastSlice";

interface loginProps {
  user: string;
  password: string;
}

const initialValues: loginProps = {
  user: "",
  password: "",
};

const options = [
  { id: "UsuPerDir", name: "Directivo", value: "Administrative" as typeUi },
  { id: "UsuPerAsi", name: "Profesional", value: "Professional" as typeUi },
  { id: "UsuPerPac", name: "Paciente", value: "Patient" as typeUi },
];

export const LoginPage = () => {
  const addModal = useModal();
  const modalTerms = useModal();
  const navigate = useNavigate();
  const postFetchData = usePostFetch("/auth/login");

  const [ui, setUi] = useState<typeUi>(null);
  const [data, setData] = useState<any[] | []>([]);

  const [, setCaptcha] = useState<string | null>();
  const onChange = (value: string | null) => {
    setCaptcha(value);
  };

  const { token, kibLevel } = useAuthStore();

  const login = useAuthStore((state) => state.login);
  const uiInterface = useAuthStore((state) => state.setUi);

  const dispatch = useAppDispatch();

  const { values, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      await postFetchData.postFetchData(values);
    },
    validationSchema: Yup.object({
      user: Yup.string().required("Usuario Requerido"),
      password: Yup.string().required("Contraseña Requerida"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    validate: (values) => {
      const errors = {};
      try {
        Yup.object({
          user: Yup.string().required("Usuario Requerido"),
          password: Yup.string().required("Contraseña Requerida"),
        }).validateSync(values, { abortEarly: false });
      } catch (validationErrors) {
        showError(errors);
      }
      return errors;
    },
  });

  useEffect(() => {
    if (postFetchData.response?.Getloginresponse?.Code === "000") {
      // aca obtengo las interfaces disponibles
      const avalaibleInterfaces: any = {
        UsuPerPac: postFetchData.response?.Getloginresponse?.UsuPerPac,
        UsuPerDir: postFetchData.response?.Getloginresponse?.UsuPerDir,
        UsuPerAsi: postFetchData.response?.Getloginresponse?.UsuPerAsi,
      };
      // aca las filtro para setearlas en el select
      const filterData = options.filter(
        (item: any) => avalaibleInterfaces?.[item?.id] === "1",
      );

      if (filterData?.length > 1) {
        const token = postFetchData.response?.token;
        if (token) {
          login(
            token,
            postFetchData.response?.Getloginresponse?.UsuPacCod,
            postFetchData.response?.Getloginresponse?.UsuNombres,
          );
        }
        // seteo data para evitar perderla en posibles reinicios de pagina
        localStorage.setItem("data", JSON.stringify(filterData));
        // aca seteo el la data filtrada en el selector para interfaces
        setData(filterData);
      } else if (filterData?.length === 1) {
        const token = postFetchData.response?.token;
        if (token) {
          login(
            token,
            postFetchData.response?.Getloginresponse?.UsuPacCod,
            postFetchData.response?.Getloginresponse?.UsuNombres,
          );
        }
        // si el usuario no tiene más perfiles disponibles
        // inicia sesión de una vez
        uiInterface(filterData[0].value);
      }
    } else {
      if (postFetchData.response?.Getloginresponse?.Code !== undefined) {
        dispatch(
          setToast({
            severity: "error",
            summary:
              "Something went wrong: " +
              postFetchData.response?.Getloginresponse?.Code,
            detail: postFetchData.response?.Getloginresponse?.Message,
          }),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postFetchData.response]);

  // aca valido si existe token pero no interfaz
  const storedData = localStorage.getItem("data"); // recolecto la data accesible que se guardo anteriormente
  useEffect(() => {
    if (storedData) {
      // si existe un storedData
      setData(JSON.parse(storedData)); // la setea para el selectField
    }
    if (token && !kibLevel) {
      // si existe token pero no kiblevel
      addModal.onVisibleModal(); // abre el modal
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, kibLevel, storedData]);
  // boton del modal

  const onSubmit = () => {
    console.log(ui);
    if (token) {
      // si existe token y ui no es nulo
      if (ui !== null) {
        dispatch(
          setToast({
            severity: "success",
            summary: "¡Inicio de sesión exitoso!",
            detail: "¡Bienvenido de vuelta!",
          }),
        );
        uiInterface(ui);
        localStorage.removeItem("data"); // remueve data del localStorage
        navigate("/");
        // setea la interfaz en el estado global
      }
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className={style.login}>
      <img className={style.bg__img} src={bg__img} alt="background" />

      <div className={style.container__form__login}>
        <img className={style.logo} src={logo} alt="Logo" />
        <div className={style.container__form}>
          <h2 className={style.txt__welcome}>Bienvenido de vuelta</h2>
          {/*
              <span className={style.txt__create}>
                ¿No tienes una cuenta? <a href="">Regístrate aquí</a>
              </span>
            */}
          <div className={style.form__login}>
            <InputText
              id="user"
              name="user"
              value={values.user}
              onChange={handleChange}
              className={style.input__line}
              placeholder="Usuario:"
              type="text"
              onBlur={handleBlur}
            />
            <InputText
              id="password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className={style.input__line}
              placeholder="Contraseña:"
              onBlur={handleBlur}
            />
            <div className={style.captcha}>
              <ReCAPTCHA
                sitekey="AAAA"
                onChange={onChange}
                style={{ paddingTop: "15px" }}
              />
            </div>
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
            {/*
                <span className={style.txt__create}>
                  ¿Olvidaste tu contraseña? <br />
                  <a href="#">Haz clic aquí para recuperarla</a>
                </span>
            */}
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
      <PrimeModal
        header="Elige un perfil"
        onHideModal={() => undefined}
        closeable={false}
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button
              style={{
                backgroundColor: "#19A8E4",
                border: "none",
                borderRadius: "8px",
                color: "#FFFFFF",
              }}
              onClick={onSubmit}
            >
              Continuar
            </Button>
          </div>
        }
        modalStatus={addModal.modalStatus}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className={style.select__perfil}>
            <Dropdown
              value={ui}
              name="ui"
              options={data}
              onChange={(e) => setUi(e.value)}
              optionLabel="name"
              optionValue="value"
              placeholder="Selecciona una opción"
            />
          </div>
        </div>
      </PrimeModal>
    </form>
  );
};
