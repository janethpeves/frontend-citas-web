import {
  SdtRecetasPacAppItemProps,
  SdtrecetaspacappProps,
} from "./interface/recetas.interface";
import { useEffect, useState } from "react";
import style from "./RecetasPage.module.css";
import document from "@/assets/icons/Sidebar/document.svg";
import moment from "moment";
// import useAuthStore from "@/store/slices/auth/useAuthStore";
import { setToast } from "@/store/slices/toast/toastSlice";
import { useAppDispatch } from "@/store/hooks";
import { Button } from "primereact/button";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useModal } from "@/hooks/useModal";
import { PrimeModal } from "@/components/PrimeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./dialogs/AddModal";

export const RecetasPage = () => {
  const addModal = useModal();
  const dispatch = useAppDispatch();

  // const { usuCod } = useAuthStore();
  const usuCod = "1";

  const getRecipes = usePostFetch("/my-recipes");

  const [data, setData] = useState<SdtrecetaspacappProps | null>(null);
  const [viewData, setViewData] = useState<SdtRecetasPacAppItemProps[] | null>(
    null
  );

  useEffect(() => {
    if (usuCod) {
      getRecipes.postFetchData({
        Usupaccod: usuCod,
      });
    }
  }, [usuCod]);
  useEffect(() => {
    if (getRecipes.response) {
      if (getRecipes.response?.Sdtrecetaspacapp !== null) {
        setData(
          getRecipes.response?.Sdtrecetaspacapp?.[
            "sdtRecetasPacApp.sdtRecetasPacAppItem"
          ]
        );
      } else {
        setData(null);
        dispatch(
          setToast({
            severity: "info",
            summary: "No se ha encontrado historial de recetas.",
            detail: "Usted no tiene recetas asignadas por el momento.",
          })
        );
      }
    }
  }, [getRecipes.response]);

  const onViewData = (data: SdtRecetasPacAppItemProps[]) => {
    if (data) {
      setViewData(data || null);
    }
    addModal.onVisibleModal();
  };
  return (
    <div>
      <div className={style.body}>
        <h1>Recetas</h1>
        <div className={style.content}>
          {data ? (
            Object(data).map((item: SdtrecetaspacappProps, index: number) => (
              <div key={index} className={style.card}>
                <div className={style.card__content}>
                  <label>
                    Profesional: <span>{item && item.PerAsisNomC}</span>
                  </label>

                  <label>
                    Especialidad: <span>{item && item.ServHosDes}</span>
                  </label>

                  <label>
                    Fecha:{" "}
                    <span>
                      {item && moment(item.Fecha).format("DD-MM-YYYY")}
                    </span>
                  </label>
                </div>
                <div style={{ paddingTop: "10px" }}>
                  <Button
                    style={{
                      backgroundColor: "#19A8E4",
                      width: "53px",
                      height: "53px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    onClick={() =>
                      onViewData(
                        item.Productos[
                          "sdtRecetasPacApp.sdtRecetasPacAppItem.producto"
                        ]
                      )
                    }
                  >
                    <img src={document} alt="" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <>Usted no tiene recetas asignadas por el momento. </>
          )}
        </div>
      </div>
      <PrimeModal
        header="Detalles del Recipe"
        onHideModal={addModal.onHideModal}
        modalStatus={addModal.modalStatus}
        width={800}
      >
        <AddModal data={viewData} onHideModal={addModal.onHideModal} />
      </PrimeModal>
    </div>
  );
};
