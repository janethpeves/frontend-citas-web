import { useEffect, useState } from "react";
import style from "./SelectSpecialityPage.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { InputSearch } from "@/components/InputSearch/InputSearch";
import { ListConatiner } from "@/components/ListContainer/ListConatiner";
import { usePostFetch } from "@/hooks/usePostFetch";
import ButtonComponent from "@/components/ButtonComponent/ButtonComponent";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setToast } from "@/store/slices/toast/toastSlice";
import { RootState } from "@/store";
import { setState } from "@/store/slices/scheduleAppointmentSlice/scheduleAppointmentSlice";
import { showError } from "@/helpers/showError";

interface SelectSpecialityProps {
  Data?: any;
  setData: (data: any) => void;
  setCurrentStep: (data: number) => void;
}

export const SelectSpecialityPage: React.FC<SelectSpecialityProps> = ({
  setData,
  setCurrentStep,
  Data,
}) => {
  const dispatch = useAppDispatch();
  const getData = usePostFetch("/specialty");
  const [option, setOption] = useState<any[]>([]);
  const appointmentData = useAppSelector((state: RootState) => state.scheduleAppointment);

  useEffect(() => {
    if (Data?.Tipoaten) {
      getData.postFetchData({
        Concitmod: "1",
      });
    }
  }, [Data?.Tipoaten]);

  useEffect(() => {
    if (getData.response) {
      setOption(getData.response?.Sdtservicesapp?.["sdtServicesApp.sdtServiceItem"]);
    }
  }, [getData.response]);

  const { values, handleSubmit, errors, resetForm } = useFormik({
    initialValues: {
      Servhoscod: "",
      Actcod: "",
      Actespcod: "",
      Tiptarcod: "",
      Tarprodcod: "",
    },
    onSubmit: async (values) => {
      dispatch(
        setState({
          ...values,
          ServHosDes: Data.Servhosdes,
        })
      );
      setData((prev: any) => ({
        ...prev,
        ...values,
      }));
      setCurrentStep(3);
    },
    validationSchema: Yup.object({
      Servhoscod: Yup.string().required("Servicio Hospitalario Requerido."),
    }),
    
  });

  useEffect(() => {
    if (appointmentData.Servhoscod && values.Servhoscod === "") {
      resetForm({
        values: {
          Servhoscod: appointmentData.Servhoscod,
          Actcod: appointmentData.Actcod,
          Actespcod: appointmentData.Actespcod,
          Tiptarcod: appointmentData.Tiptarcod,
          Tarprodcod: appointmentData.Tarprodcod,
        },
      });
    }
  }, [appointmentData]);

  useEffect(() => {
    if (errors.Servhoscod) {
      dispatch(
        setToast({
          severity: "error",
          summary: "Error en el formulario",
          detail: errors.Servhoscod,
        })
      );
    }
  }, [errors]);

  return (
    <form noValidate onSubmit={handleSubmit} className={style.container}>
      <div className={style.content}>
        <div className={style.card__container}>
          <h2 className={style.title}>Seleccionar Especialidad</h2>
          <InputSearch />
          <ListConatiner>
            <div className={style.specialties_grid}>
              {option &&
                option.map((item, index) => (
                  <div
                    key={index}
                    className={`${style.card__option} ${
                      values.Servhoscod === item.ServHosCod ? style.selected : ""
                    }`}
                    onClick={() => {
                      resetForm({
                        values: {
                          Servhoscod: option[index].ServHosCod,
                          Actcod: option[index].ActCod,
                          Actespcod: option[index].ActEspCod,
                          Tiptarcod: option[index].TipTarCod,
                          Tarprodcod: option[index].TarProdCod,
                        },
                      });
                      setData((prev: any) => ({
                        ...prev,
                        Servhosdes: item.ServHosDes,
                      }));
                    }}
                  >
                    <p className={style.card__title}>{item.ServHosDes}</p>
                  </div>
                ))}
            </div>
          </ListConatiner>
        </div>

        <div className={style.button_container}>
          <ButtonComponent
            onCancel={() => {
              setCurrentStep(1);
            }}
          />
        </div>
      </div>
    </form>
  );
};