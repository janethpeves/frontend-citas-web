import React from "react";
import styles from "./ButtonComponent.module.css";

interface ButtonComponentProps {
	showCancel?: boolean;
	onContinue?: () => void;
	onSubmit?: any;
	onCancel?: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
	showCancel = true,
	onContinue,
	onCancel,
	onSubmit,
}) => {
	return (
		<div className={styles.buttonContainer}>
			{showCancel && (
				<button className={styles.cancelButton} onClick={onCancel} type="button">
					<span className={styles.icon}>↩</span> Regresar
				</button>
			)}
			<button
				className={styles.continueButton}
				onClick={onContinue}
				type="submit"
				onSubmit={onSubmit}
			>
				Continuar <span className={styles.icon}>→</span>
			</button>
		</div>
	);
};

export default ButtonComponent;
