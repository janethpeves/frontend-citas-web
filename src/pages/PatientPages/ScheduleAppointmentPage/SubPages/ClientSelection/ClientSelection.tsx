import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { SelectButton } from "primereact/selectbutton";
import { usePostFetch } from "@/hooks/usePostFetch";
// import useAuthStore from "@/store/slices/auth/useAuthStore";
import * as Yup from "yup";
import { useFormik } from "formik";
import { setState } from "@/store/slices/scheduleAppointmentSlice/scheduleAppointmentSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ButtonComponent from "@/components/ButtonComponent/ButtonComponent";
import { RootState } from "@/store";
import styles from "./ClientSelection.module.css";
import { showError } from "@/helpers/showError";

interface ClientSelectionProps {
  Id: string | undefined;
  SegCod: string;
  RegCod: string;
  PlanCod: string;
  Name: string;
  CatCodigo: string;
}

interface InitialValuesProps {
  Id: string | number | undefined;
  Segcod: string;
  Regcod: string;
  Plancod: string;
  Plandes: string;
  Tipoaten: string;
}

const initialValues: InitialValuesProps = {
  Id: undefined,
  Segcod: "",
  Regcod: "",
  Plancod: "",
  Plandes: "",
  Tipoaten: "",
};

interface ClienSelectProps {
  setData: (data: any) => void;
  setCurrentStep: (data: number) => void;
}

export const ClientSelection: React.FC<ClienSelectProps> = ({
  setData,
  setCurrentStep,
}) => {
  const dispatch = useAppDispatch();
  const getPlans = usePostFetch("/health-plans");
  const [options, setOption] = useState<ClientSelectionProps[]>([]);
  // const { usuCod } = useAuthStore();
  const usuCod = "1";
  const appointmentData = useAppSelector(
    (state: RootState) => state.scheduleAppointment
  );

  useEffect(() => {
    if (usuCod) {
      getPlans.postFetchData({
        Usupaccod: `${usuCod}`,
      });
    }
  }, [usuCod]);

  useEffect(() => {
    if (getPlans.response)
      setOption(
        getPlans.response?.Sdtplanpacapp?.["sdtPlanPacApp.sdtPlanPacAppItem"]
      );
  }, [getPlans.response]);

  const { values, handleChange, handleSubmit, resetForm, setValues } =
    useFormik({
      initialValues,
      onSubmit: (values) => {
        dispatch(
          setState({
            ...values,
            Usupaccod: usuCod,
          })
        );
        setData((prev: any) => {
          return {
            ...prev,
            ...values,
            Id: `${values.Id}`,
            Usupaccod: usuCod,
          };
        });
        setCurrentStep(2);
      },
      validationSchema: Yup.object({
        Id: Yup.string().required("Tipo de financiamiento requerido."),
        Tipoaten: Yup.string().required("Modalidad de la atención requerido."),
      }),
      validateOnBlur: false,
      validateOnChange: false,
      validate: (values) => {
        const errors = {};
        try {
          Yup.object({
            Id: Yup.string().required("Tipo de financiamiento requerido."),
            Tipoaten: Yup.string().required(
              "Modalidad de la atención requerido."
            ),
          }).validateSync(values, { abortEarly: false });
        } catch (validationErrors) {
          showError(errors);
        }
        return errors;
      },
    });
  useEffect(() => {
    if (values.Id && appointmentData.Id === "") {
      const filterData: ClientSelectionProps[] = options.filter(
        (option) => option.Id === values.Id
      );
      setValues((prev) => {
        return {
          ...prev,
          Id: values.Id,
          Segcod: filterData[0]?.SegCod,
          Regcod: filterData[0]?.RegCod,
          Plancod: filterData[0]?.PlanCod,
          Plandes: filterData[0]?.Name,
        };
      });
    }
    if (appointmentData.Id && values.Id === undefined) {
      resetForm({
        values: {
          Id: appointmentData.Id,
          Segcod: appointmentData.Segcod,
          Regcod: appointmentData.Regcod,
          Plancod: appointmentData.Plancod,
          Plandes: appointmentData.Plandes,
          Tipoaten: appointmentData.Tipoaten,
        },
      });
    }
  }, [values.Id, appointmentData]);

  return (
    <div className={styles.container}>
      <form noValidate onSubmit={handleSubmit} className={styles.formWrapper}>
        <div className={styles.card}>
          <h3 className={styles.title}>¿Cómo desea financiar tu atención?</h3>

          <div className={styles.dropdown}>
            <Dropdown
              value={values.Id}
              name="Id"
              options={options}
              onChange={handleChange}
              optionLabel="Name"
              optionValue="Id"
              placeholder="Selecciona una opción"
              className="w-full"
            />
          </div>

          <div className={styles.infoBox}>
            <p className={styles.infoText}>
              NOTA: Los seguros reflejados son asignados en base a sus seguros
              disponibles.
            </p>
          </div>

          <div className={styles.modalitySection}>
            <h3 className={styles.modalityTitle}>Seleccionar Modalidad</h3>
            <div className={styles.modalityButtons}>
              <SelectButton
                value={values.Tipoaten}
                name="Tipoaten"
                optionLabel="name"
                onChange={handleChange}
                options={[
                  { name: "Presencial", value: "1" },
                  { name: "Virtual", value: "2" },
                ]}
              />
            </div>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <ButtonComponent showCancel={false} />
        </div>
      </form>
    </div>
  );
};
