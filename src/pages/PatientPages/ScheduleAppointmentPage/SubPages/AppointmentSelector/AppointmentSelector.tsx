import React, { useEffect, useState } from "react";
import styles from "./AppointmentSelector.module.css";
import notifyIcon from "./assets/notify.svg";
import moment from "moment";

import { Calendar } from "primereact/calendar";
// import { ListConatiner } from "@/components/ListContainer/ListConatiner";

import * as Yup from "yup";
import { useFormik } from "formik";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setToast } from "@/store/slices/toast/toastSlice";
import { usePostFetch } from "@/hooks/usePostFetch";
import ButtonComponent from "@/components/ButtonComponent/ButtonComponent";
import { RootState } from "@/store";
import { setState } from "@/store/slices/scheduleAppointmentSlice/scheduleAppointmentSlice";
import { showError } from "@/helpers/showError";
import { Divider } from "primereact/divider";

interface AppointmentSelectorProps {
	Data?: any;
	setData: (data: any) => void;
	setCurrentStep: (data: number) => void;
}
interface InitialValues {
	Servhoscod: string;
	Actcod: string;
	Actespcod: string;
	Fecha: Date | undefined;
	Perasisnom: string;
	Perasisdocidennum: string;
	Tipdocidenpercod: string;
	Hora: string;
	Cupo: string;
	Turhorfin: string;
	Turhorini: string;
	Urlcall: string;
}
export const AppointmentSelector: React.FC<AppointmentSelectorProps> = ({
	setData,
	setCurrentStep,
	Data,
}) => {
	const dispatch = useAppDispatch();
	const getProfessional = usePostFetch("/professionals-by-specialty");
	const getQuotes = usePostFetch("/shifts-and-quotas");
	const [med, setMed] = useState<any>(null);
	const [times, setTime] = useState<any>(null);

	const initialValues: InitialValues = {
		Servhoscod: Data.Servhoscod,
		Actcod: Data.Actcod,
		Actespcod: Data.Actespcod,
		Fecha: new Date(),
		Perasisnom: "",
		Perasisdocidennum: "",
		Tipdocidenpercod: "",
		Cupo: "",
		Hora: "",
		Turhorini: "",
		Turhorfin: "",
		Urlcall: "",
	};
	const appointmentData = useAppSelector((state: RootState) => state.scheduleAppointment);

	const { values, handleSubmit, handleChange, setValues, setFieldValue } = useFormik({
		initialValues,
		onSubmit: async (values) => {
			dispatch(
				setState({
					...values,
					Fecha: `${values.Fecha}`,
				})
			);
			setData((prev: any) => {
				return {
					...prev,
					...values,
					Fecha: moment(values.Fecha).format("YYYY-MM-DD"),
				};
			});
			setCurrentStep(4);
		},
		validationSchema: Yup.object({
			Fecha: Yup.string().required("Fecha de la atención requerida."),
			Perasisdocidennum: Yup.string().required("Médico Requerido."),
			Cupo: Yup.string().required("Cupo de la atención requerida."),
		}),
		validateOnBlur: false,
		validateOnChange: false,
		validate: (values) => {
			const errors = {};
			try {
				Yup.object({
					Fecha: Yup.string().required("Fecha de la atención requerida."),
					Perasisdocidennum: Yup.string().required("Médico Requerido."),
					Cupo: Yup.string().required("Cupo de la atención requerida."),
				}).validateSync(values, { abortEarly: false });
			} catch (validationErrors) {
				showError(errors);
			}
			return errors;
		},
	});

	useEffect(() => {
		if (appointmentData.Fecha) {
			setValues((prev: any) => {
				return {
					...prev,
					Urlcall: "",
					Fecha: new Date(appointmentData.Fecha),
					Hora: appointmentData.Hora,
					Perasisnom: appointmentData.Perasisnom,
					Perasisdocidennum: appointmentData.Perasisdocidennum,
					Tipdocidenpercod: appointmentData.Tipdocidenpercod,
					Cupo: appointmentData.Cupo,
					Turhorini: appointmentData.Turhorini,
					Turhorfin: appointmentData.Turhorfin,
				};
			});
		}
	}, [appointmentData]);
	useEffect(() => {
		if (values.Fecha) {
			getProfessional.postFetchData({
				Servhoscod: Data.Servhoscod,
				Actcod: Data.Actcod,
				Actespcod: Data.Actespcod,
				Fecha: moment(values.Fecha).format("YYYY-MM-DD"),
			});
		}
	}, [values.Fecha]);
	useEffect(() => {
		if (getProfessional.response?.Sdtprofasisprogapp === null) {
			dispatch(
				setToast({
					severity: "info",
					summary: "No hay médicos disponibles.",
					detail: "No hay medicos disponibles para la fecha seleccionada.",
				})
			);
			setMed(null);
			setTime(null);
			setValues((prev) => {
				return {
					...prev,
					...initialValues,
					Fecha: values.Fecha,
				};
			});
		} else if (getProfessional.response?.Sdtprofasisprogapp === null) {
			setMed(null);
			setTime(null);
			setValues((prev) => {
				return {
					...prev,
					...initialValues,
					Fecha: values.Fecha,
				};
			});
			setMed(
				getProfessional.response?.Sdtprofasisprogapp?.["sdtProfAsisProgApp.sdtProfAsisProgAppItem"]
			);
		} else {
			setMed(
				getProfessional.response?.Sdtprofasisprogapp?.["sdtProfAsisProgApp.sdtProfAsisProgAppItem"]
			);
		}
	}, [getProfessional.response, appointmentData]);

	useEffect(() => {
		if (values.Perasisdocidennum !== "" && values.Fecha) {
			getQuotes.postFetchData({
				Servhoscod: Data.Servhoscod,
				Actcod: Data.Actcod,
				Actespcod: Data.Actespcod,
				Fecha: moment(values.Fecha).format("YYYY-MM-DD"),
				Perasisdocidennum: values.Perasisdocidennum,
				Tipdocidenpercod: values.Tipdocidenpercod,
			});
		}
	}, [values.Perasisdocidennum, values.Fecha]);

	useEffect(() => {
		if (getQuotes.response) {
			setTime(null);
			setFieldValue(
				"Turhorini",
				getQuotes.response?.Sdtturnoscuposapp?.["sdtTurnosCuposApp.sdtTurnoAppItem"][0].TurHorIni
			);
			setFieldValue(
				"Turhorfin",
				getQuotes.response?.Sdtturnoscuposapp?.["sdtTurnosCuposApp.sdtTurnoAppItem"][0].TurHorFin
			);
		} else {
			setTime(null);
		}

		setTime(
			getQuotes.response?.Sdtturnoscuposapp?.["sdtTurnosCuposApp.sdtTurnoAppItem"][0].CuposApp[
			"sdtTurnosCuposApp.sdtTurnoAppItem.CupoAppItem"
			]
		);
	}, [getQuotes.response]);

	return (
		<form noValidate onSubmit={handleSubmit} className={styles.appointmentContainer}>
			<div>
				<h2>Día de la cita</h2>
				<div className={styles.calendarContainer}>
					<Calendar
						value={values.Fecha}
						name="Fecha"
						onChange={(e: any) => {
							if (new Date(e.target.value).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
								dispatch(
									setToast({
										severity: "warn",
										summary: "No se pueden asignar citas antiguas",
										detail: "No se pueden asignar citas en días pasados.",
									})
								);
								handleChange(values.Fecha);
							} else {
								setFieldValue("Fecha", e.value);
							}
						}}
						inline
						style={{
							width: "100%",
						}}
					/>
					<div className={styles.notify}>
						<div className={styles.notify__img}>
							<img src={notifyIcon} alt="" />
						</div>
						<div className={styles.notify_content}>
							<div>
								<p className={styles.notify__text}>¿En donde desea que se le notifique?</p>
							</div>
							<div>
								{options.map((slot, key) => (
									<button key={key} className={`${styles.timeButton}`} type="button">
										{slot.name}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<h2>Elegir Médico</h2>
				<div className={styles.timeContainer}>
					{values.Perasisnom && (
						<div className={styles.med__info}>
							<label>DR. {values.Perasisnom}</label>
							<hr />
							<p>{appointmentData.ServHosDes}</p>
						</div>
					)}
					<div>
						<Divider style={{ width: "60vw !" }} />
					</div>

					<div className={styles.containerDoctor}>
						{med ? (
							med.map((info: any, index: number) => (
								<div
									className={styles.select__info}
									key={index}
									onClick={() => {
										setValues((prev) => {
											return {
												...prev,
												Perasisnom: med[index].PerAsisNom,
												Perasisdocidennum: med[index].PerAsisDocIdenNum,
												Tipdocidenpercod: med[index].TipDocIdenPerCod,
											};
										});
									}}
									style={
										values.Perasisnom === info.PerAsisNom
											? { color: "black", boxShadow: "none", border: "1px solid #007ad9" }
											: {}
									}
								>
									<label>DR. {info.PerAsisNom}</label>
									<hr />
									<p>{appointmentData.ServHosDes}</p>
								</div>
							))
						) : (
							<div>Seleccione una fecha.</div>
						)}
					</div>

					<p className={styles.time__title}>Horarios</p>
					<div>
						<hr />
					</div>

					<div className={styles.timeGrid}>
						{times ? (
							times.map((slot: any, key: any) => (
								<button
									key={key}
									className={`${styles.timeButton} ${values.Cupo === `${slot.Cupo}` ? styles.selected : ""
										}`}
									type="button"
									onClick={() => {
										setValues((prev) => {
											return {
												...prev,
												Hora: slot.Hora,
												Cupo: `${slot.Cupo}`,
											};
										});
									}}
								>
									{slot.Hora}
								</button>
							))
						) : (
							<>Seleccione un Médico.</>
						)}
					</div>
				</div>

				<div className={styles.moduleButton}>
					<div className={styles.moduleButton}>
						<ButtonComponent
							onCancel={() => {
								setCurrentStep(2);
							}}
						/>
					</div>
				</div>
			</div>
		</form>
	);
};
const options = [{ name: "Whatsapp" }, { name: "Email" }, { name: "SMS" }];
