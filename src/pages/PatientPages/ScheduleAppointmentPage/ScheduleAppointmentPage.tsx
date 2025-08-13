import { useEffect, useState } from "react";
import style from "./ScheduleAppointment.module.css";

import { LineaTiempo } from "@/components/LineaTiempo/LineaTiempo";
import { PaymentDetail } from "@/pages/PatientPages/ScheduleAppointmentPage/SubPages/PaymentDetail/PaymentDetail";
import { PaymentMethods } from "@/pages/PatientPages/ScheduleAppointmentPage/SubPages/PaymentMethod/PaymentMethods";

import { SelectSpecialityPage } from "./SubPages/SelectSpecialityPage/SelectSpecialityPage";
import { ClientSelection } from "./SubPages/ClientSelection/ClientSelection";
import { AppointmentSelector } from "./SubPages/AppointmentSelector/AppointmentSelector";
import { useNavigate } from "react-router-dom";

const steps = [
	{ id: 1, label: "Cliente" },
	{ id: 2, label: "Especialidad" },
	{ id: 3, label: "Horarios" },
	{ id: 4, label: "Detalles" },
	{ id: 5, label: "Pago" },
];

export const ScheduleAppointmentPage = () => {
	const navigate = useNavigate();
	const [data, setData] = useState<any>([]);
	const [currentStep, setCurrentStep] = useState(1);
	const FINAL_STEP = data.Plancod === "00002" ? 4 : 5;
	useEffect(() => {
		if (currentStep > FINAL_STEP) {
			navigate("/");
		}
	}, [currentStep]);
	return (
		<div className={style.container}>
			<div className={style.containerContent}>
				<div className={style.lineaTiempoWrapper}>
					<LineaTiempo steps={steps} currentStep={currentStep} />
				</div>
				<div className={style.content}>
					{currentStep === 1 && (
						<ClientSelection setData={setData} setCurrentStep={setCurrentStep} />
					)}
					{currentStep === 2 && (
						<SelectSpecialityPage setData={setData} setCurrentStep={setCurrentStep} Data={data} />
					)}
					{currentStep === 3 && (
						<AppointmentSelector setData={setData} setCurrentStep={setCurrentStep} Data={data} />
					)}
					{currentStep === 4 && (
						<PaymentDetail setData={setData} Data={data} setCurrentStep={setCurrentStep} />
					)}
					{currentStep === 5 && data.Plancod !== "00002" && <PaymentMethods />}
				</div>
			</div>
		</div>
	);
};
