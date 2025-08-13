/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import style from "./Dashboard.module.css";

import { WelcomeClient } from "@/components/WelcomeClient/WelcomeClient";
import DataTable from "@/components/DataTable/DataTable";
import { Button } from "primereact/button";

import { useModal } from "@/hooks/useModal";
import { PrimeModal } from "@/components/PrimeComponents/PrimeModal/PrimeModal";
import { AddModal } from "./AddModal/AddModal";
import { usePostFetch } from "@/hooks/usePostFetch";
import useAuthStore from "@/store/slices/auth/useAuthStore";
import { useEffect, useState } from "react";
import moment from "moment";

export const Dashboard = () => {
	const addModal = useModal();
	const deleteModal = useModal();
	const [data, setData] = useState();
	const handleView = (row: any) => {
		setData(row);
		addModal.onVisibleModal();
	};
	const getAttentions = usePostFetch("/my-dates");
	const { usuCod } = useAuthStore();
	useEffect(() => {
		if (usuCod) {
			const getAtt = async () => {
				await getAttentions.postFetchData({ Usupaccod: usuCod });
			};
			getAtt();
		}
	}, [usuCod]);
	const response = getAttentions.response.Sdtcitaspacapp?.["sdtCitasPacApp.sdtCitasPacAppItem"];

	return (
		<>
			{/* <HeaderSearch /> */}
			<WelcomeClient />
			{/*
				<div className={style.containerTable}>
					<h2>Mis proximas citas</h2>
					<DataTable columns={nextColumn} data={nextData || []} onView={() => {}} onEdit={() => {}} />
				</div>
			*/}
			<div className={style.containerTable}>
				<h2>Mis citas pendientes</h2>
				<DataTable
					error=""
					columns={columns}
					data={response || []}
					onDelete={() => deleteModal.onVisibleModal()}
					onEdit={() => { }}
					onView={handleView}
				/>
			</div>

			<PrimeModal
				header="Detalles de la cita"
				modalStatus={addModal.modalStatus}
				onHideModal={addModal.onHideModal}
				width={500}
			>
				<AddModal onHideModal={addModal.onHideModal} data={data} />
			</PrimeModal>
			<PrimeModal
				header="¿Esta seguro que desea anular su cita?"
				modalStatus={deleteModal.modalStatus}
				onHideModal={deleteModal.onHideModal}
				width={499}
			>
				<div>
					<p>
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
						has been the industry's standard dummy text ever since the 1500s, when an unknown
					</p>
					<div className={style.confirm__buttons}>
						<Button label="Anular" style={{ backgroundColor: "#FF4E4E" }} />
					</div>
				</div>
			</PrimeModal>
		</>
	);
};

const columns = [
	{
		field: "image",
		header: "",
		body: (_row: any) => (
			<img
				src={
					"https://cdn4.vectorstock.com/i/1000x1000/34/53/default-placeholder-doctor-half-length-portrait-vector-20773453.jpg"
				}
				alt="Doctor"
				width={50}
			/>
		),
	},
	{ field: "Medico", header: "Doctor" },
	{ field: "Centro", header: "Centro" },
	{ field: "Servicio", header: "Servicio" },
	{ field: "Consultorio", header: "Consultorio" },
	{
		body: (row: any) => (
			<span style={{ display: "flex", justifyContent: "center" }}>
				<p>{row?.Fecha?.split("T")[0] || ""}</p>
			</span>
		),
		header: "Fecha",
	},
	{ field: "Hora", header: "Hora" },
	{ field: "TipoCita", header: "Tipo de cita" },
	{ field: "TipoAten", header: "Tipo de Atención" },
	{
		header: "Estado",
		body: (row: any) => (
			<span style={{ display: "flex", justifyContent: "center" }}>
				{row.Estado === "PENDIENTE A." ? (
					<div className={style.pending}>
						<p>Pendiente</p>
					</div>
				) : (
					<div className={style.confirmed}>
						<p>Confirmada</p>
					</div>
				)}
			</span>
		),
	},
];
