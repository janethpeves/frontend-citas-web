import { usePostFetch } from "@/hooks/usePostFetch";
import style from "./Atenciones.module.css";
import DataTable from "@/components/DataTable/DataTable";
// import useAuthStore from "@/store/slices/auth/useAuthStore";
import { useEffect } from "react";
import moment from "moment";
import "moment/locale/es";

moment.locale("es");
export const Atenciones = () => {
  const getAttentions = usePostFetch("/my-attentions");

  const usuCod = "1";
  useEffect(() => {
    if (usuCod) {
      const getAtt = async () => {
        await getAttentions.postFetchData({ Usupaccod: usuCod });
      };
      getAtt();
    }
  }, [usuCod]);
  const response =
    getAttentions.response.Sdtatencionesapp?.[
      "sdtAtencionesApp.sdtAtencionAppItem"
    ];
  return (
    <div>
      <div className={style.content}>
        <div className={style.header}>
          <div className={style.title}>
            <label>Mis Atenciones</label>
          </div>
        </div>
        <DataTable data={response ? response : []} columns={columns} />
      </div>
    </div>
  );
};
const columns = [
  { field: "", header: "" },
  { field: "AreHosDesCor", header: "Area Hospitalaria" },
  { field: "Profesional", header: "Profesional" },
  { field: "ServHosDes", header: "Especialidad" },
  {
    body: (row: any) => (
      <span style={{ display: "flex", justifyContent: "center" }}>
        <p>{moment(row.FechaAten).format("DD MMM YYYY")}</p>
      </span>
    ),
    header: "Fecha",
  },
];
