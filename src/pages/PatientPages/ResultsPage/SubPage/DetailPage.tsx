import { useEffect, useState } from "react";
import style from "./Detail.module.css";

import moment from "moment";
import { Button } from "primereact/button";
import document from "@/assets/icons/Sidebar/document.svg";
import { useNavigate, useParams } from "react-router-dom";
// import useAuthStore from "@/store/slices/auth/useAuthStore";
import { postFetch } from "@/helpers/postFetch";
import { useAppDispatch } from "@/store/hooks";
import { setToast } from "@/store/slices/toast/toastSlice";

export const DetailResult = () => {
	const [data, setData] = useState<any>([]);
	const { id } = useParams();
	// const { usuCod } = useAuthStore();
	const usuCod = "1";
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (usuCod && id) {
			const PostData = async () => {
				const res = await postFetch("/my-exams", {
					Usupaccod: `${usuCod}`,
					Tipexacod: id,
				});
				if (res?.data?.Sdtexaauxapp !== null)
					setData(res?.data?.Sdtexaauxapp?.["sdtExaAuxApp.sdtExaAuxAppItem"]);
				else {
					dispatch(
						setToast({
							severity: "info",
							summary: "No se encontró examenes",
							detail: "No existen registro de examenes.",
						})
					);
				}
			};
			PostData();
		}
	}, [usuCod, id]);
	return (
		<div>
			<h1>Resultados</h1>
			<div
				style={{
					display: "flex",
					justifyContent: "end",
					paddingBottom: "15px",
				}}
			>
				<Button onClick={() => navigate("/resultados/")}>Regresar</Button>
			</div>
			<div className={style.body}>
				<div className={style.content}>
					{data.map((item: any, index: number) => (
						<div key={index} className={style.card}>
							<div className={style.card__content}>
								<label>
									Resultado: <span>{item.CPSDes}</span>
								</label>

								<label>
									Especialidad: <span>{item.TipoExa}</span>
								</label>

								<label>
									Fecha: <span>{moment(item.Fecha).format("DD-MM-YYYY")}</span>
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
									onClick={() => {
										if (item.ResulUrl.length > 0) navigate(item.ResulUrl);
									}}
								>
									<img src={document} alt="" />
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
