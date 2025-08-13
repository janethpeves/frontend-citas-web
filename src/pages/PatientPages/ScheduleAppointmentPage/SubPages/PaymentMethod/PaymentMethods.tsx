import { useState } from "react";
import { FaCreditCard } from "react-icons/fa";

import style from "./PaymentMethods.module.css";
import { InputField } from "@/components/InputField/InputField";

import paymentIcon from "@/assets/icons/paymentDetails.svg";

export const PaymentMethods = () => {
	const [selectedMethod, setSelectedMethod] = useState<string>("CreditCard");

	console.log(selectedMethod);
	return (
		<div className={style.containerPaymen}>
			<div className={style.summaryContainer}>
				<section className={style.costSummary}>
					<h3 className={style.title}>Cita Ambulatoria</h3>
					<p className={style.description}>
						Lorem Ipsum is simply dummy text of the printing and typesetting industry.
					</p>
					<div className={style.costDetails}>
						<div className={style.costItem}>
							<span>Precio de cita</span>
							<span>S/8.000</span>
						</div>
						<div className={style.costItem}>
							<span>IVA</span>
							<span>S/800</span>
						</div>
						<div className={style.costItem}>
							<span>Descuento</span>
							<span>S/0.00</span>
						</div>
						<div className={`${style.costItem} ${style.totalCost}`}>
							<span>Total</span>
							<span>S/8.800</span>
						</div>
					</div>
					<hr
						style={{
							margin: "1rem 0",
							border: "none",
							borderBottom: "1px solid #e0e0e0",
						}}
					/>
					<div className={style.totalPrice}>S/8.800</div>
				</section>

				<section className={style.infoSection}>
					<div className={style.infoItem}>
						<div className={style.icon}>
							<i className="fa fa-clock-o"></i>
						</div>
						<div className={style.infoText}>
							<strong>Lorem Ipsum is simply</strong>
							<p>
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
								Ipsum.
							</p>
						</div>
					</div>
					<div className={style.infoItem}>
						<div className={style.icon}>
							<i className="fa fa-ticket"></i>
						</div>
						<div className={style.infoText}>
							<strong>Lorem Ipsum is simply</strong>
							<p>
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
								Ipsum.
							</p>
						</div>
					</div>
				</section>
			</div>

			<div
				className={style.paymentMethods}
				style={{
					height: selectedMethod === "CreditCard" ? "auto" : "300px",
				}}
			>
				<div className={`${style.method} ${selectedMethod === "Wallet" ? style.activeMethod : ""}`}>
					<input
						type="radio"
						id="wallet"
						name="payment"
						checked={selectedMethod === "Wallet"}
						onChange={() => setSelectedMethod("Wallet")}
					/>
					<label htmlFor="wallet" className={style.label}>
						<div className={style.methodLabel}>
							<span
								className={`${style.circle} ${
									selectedMethod === "Wallet" ? style.activeCircle : ""
								}`}
							></span>
							<span className={style.methodTitle}>Billetera Digital</span>
						</div>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
					</label>
				</div>
				<div
					className={`${style.method} ${selectedMethod === "CreditCard" ? style.activeMethod : ""}`}
				>
					<input
						type="radio"
						id="creditCard"
						name="payment"
						checked={selectedMethod === "CreditCard"}
						onChange={() => setSelectedMethod("CreditCard")}
					/>
					<label htmlFor="creditCard" className={style.label}>
						<div className={style.methodLabel}>
							<span
								className={`${style.circle} ${
									selectedMethod === "CreditCard" ? style.activeCircle : ""
								}`}
							></span>
							<div className={style.titleImgCredit}>
								<span className={style.methodTitle}>Credit Card</span>
								<div className={style.cardIcons}>
									<img src={paymentIcon} alt="Visa" />
								</div>
							</div>
						</div>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
					</label>

					{selectedMethod === "CreditCard" && (
						<>
							<hr
								style={{
									margin: "1rem 0",
									border: "none",
									borderBottom: "1px solid #e0e0e0",
								}}
							/>
							<div className={style.cardDetails}>
								<InputField label="Número de tarjeta" type="text" maxLength={16} />
								<div className={style.inlineFields}>
									<InputField
										label="Código CCV"
										type="text"
										maxLength={3}
										icon={<FaCreditCard />}
									/>
									<InputField label="Fecha de expiración" type="text" />
								</div>
								<InputField label="Nombre completo" type="text" />
								<InputField label="Email" type="email" />
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
