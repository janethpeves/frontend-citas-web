/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import style from "./PaymentDetail.module.css";
import { Detail } from "./Detail";
import moment from "moment";
import calendarIcon from "@/assets/icons/PaymentsDetail/calendar.svg";
import clockIcon from "@/assets/icons/PaymentsDetail/clock.svg";
import documentIcon from "@/assets/icons/PaymentsDetail/document.svg";
import personIcon from "@/assets/icons/PaymentsDetail/person.svg";
import pinIcon from "@/assets/icons/PaymentsDetail/pin.svg";
import ButtonComponent from "@/components/ButtonComponent/ButtonComponent";
import { usePostFetch } from "@/hooks/usePostFetch";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";
import { setToast } from "@/store/slices/toast/toastSlice";
import { zoomParameters } from "@/settings/zoom";
import { clearState } from "@/store/slices/scheduleAppointmentSlice/scheduleAppointmentSlice";

interface AppointmentSelectorProps {
	Data?: any;
	setCurrentStep: (Data: number) => void;
	setData?: (Data: any) => void;
}

export const PaymentDetail: React.FC<AppointmentSelectorProps> = ({
	Data,
	setCurrentStep,
	setData,
}) => {
	const dispatch = useAppDispatch();
	const postData = usePostFetch(
		"/book-appointment",
		"Asignación de cita",
		"¡La cita fue creada exitosamente!"
	);
	const postZoom = usePostFetch("/zoom/meeting_zoom");
	const rateProduct = usePostFetch("/product-rate");
	const {
		Servhosdes,
		Perasisnom,
		Plandes,
		Hora,
		Tiptarcod,
		Tarprodcod,
		Servhoscod,
		Usupaccod,
		Segcod,
		Regcod,
		Plancod,
		...data
	} = Data;
	const appointmentData = useAppSelector((state: RootState) => state.scheduleAppointment);

	const onSubmit = async () => {
		const { Plandes, Servhosdes, Hora, Mount, Perasisnom, ...data } = Data;
		if (Data.Tipoaten === "2") {
			if (postZoom?.response?.join_url)
				await postData.postFetchData({ ...data, Urlcall: postZoom?.response?.join_url });
		} else await postData.postFetchData(data);
		setCurrentStep(5);
		clearState();
	};

	useEffect(() => {
		const fetchPrice = async () => {
			try {
				await rateProduct.postFetchData({
					Tiptarcod,
					Tarprodcod,
					Servhoscod,
					Usupaccod,
					Segcod,
					Regcod,
					Plancod,
				});
			} catch (error) {
				if (error instanceof Error) {
					dispatch(
						setToast({
							severity: "error",
							summary: "Error",
							detail: error.message,
						})
					);
				}
			}
		};
		fetchPrice();
	}, []);

	useEffect(() => {
		if (rateProduct?.response?.Code === "000") {
			const Mount = rateProduct?.response?.Message;
			if (setData) {
				setData((prevData: any) => ({
					...prevData,
					Mount,
				}));
			}
		}
	}, [rateProduct.response]);

	useEffect(() => {
		if (data.Tipoaten === "2") {
			const getFetch = async () => {
				await postZoom.postFetchData(zoomParameters(Servhosdes, data.Fecha));
			};
			getFetch();
			if (!postZoom?.response) {
				dispatch(
					setToast({
						severity: "error",
						summary: "Something went wrong",
						detail: postZoom?.response?.message,
					})
				);
			}
		}
	}, [data.Tipoaten]);

	useEffect(() => {
		if (postData.response?.Sdtreservarcitarespondeapp?.Code === "000") {
			dispatch(
				setToast({
					severity: "success",
					summary: "Operación Realizada Exitosamente.",
					detail: postData.response?.Sdtreservarcitarespondeapp?.Message,
				})
			);
			dispatch(clearState());
		} else {
			dispatch(
				setToast({
					severity: "error",
					summary: postData.response?.Sdtreservarcitarespondeapp?.Message,
					detail: "Pruebe asignando una cita en un horario distinto.",
				})
			);
		}
	}, [postData.response]);

	return (
		<section className={style.container__payment}>
			<div className={style.payment}>
				<h2>Total a pagar</h2>

				<div className={style.container__mount}>
					<div>
						<span style={{ fontSize: "13px" }}>Aseguradora</span>
						<span style={{ fontSize: "13px" }}>Importe</span>
					</div>
					<div>
						<span style={{ fontWeight: "700" }}>{Plandes}</span>
						<span style={{ fontWeight: "700" }}>
							{Data.Mount ? `${Data.Mount} Sol/s` : "0,00 Sol/s"}
						</span>
					</div>
				</div>

				<div className={style.container__detail}>
					<Detail detail="Especialidad" value={Servhosdes} icon={documentIcon} />
					<Detail detail="Profesional" value={Perasisnom} icon={personIcon} />
				</div>

				<div className={style.container__detail}>
					<Detail
						detail="Fecha"
						value={moment(data.Fecha).format("YYYY-MM-DD")}
						icon={calendarIcon}
					/>
					<Detail detail="Hora" value={Hora} icon={clockIcon} />
				</div>

				<div className={style.container__detail}>
					<Detail
						detail="Ubicacion"
						value={Data.location ? Data.location : "Hospital ***"}
						icon={pinIcon}
					/>
					<Detail
						detail="Tipo de cita"
						value={appointmentData.Tipoaten === "1" ? "Presencial" : "Virtual"}
						icon={pinIcon}
					/>
				</div>

				<div className={style.container__detail}>
					<Detail detail="Consultorio" value={Data.consultory ? Data.consultory : "505"} />
				</div>
			</div>

			<div className={style.moduleButton}>
				<ButtonComponent onContinue={onSubmit} onCancel={() => setCurrentStep(3)} />
			</div>
		</section>
	);
};
