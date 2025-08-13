import style from "./CheckBoxField.module.css";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";

interface CheckBoxFieldProps {
	textLabel: string;
	value: boolean;
	name: string;
	onChange: (e: CheckboxChangeEvent) => void;
	direction?: "row" | "column";
	reverseDirection?: boolean;
}

export const CheckBoxField = ({
	textLabel,
	value,
	name,
	onChange,
	direction,
	reverseDirection,
}: CheckBoxFieldProps) => {
	return (
		<div
			className={`${style.item__group} ${
				direction === "column" ? style.item__column : style.item__row
			} ${reverseDirection ? style.item__reverse : ""}`}
		>
			<Checkbox
				value={value}
				name={name}
				onChange={onChange}
				// size="small"
				checked={value}
				style={{ display: "flex", justifyContent: "flex-start", width: "fit-content" }}
			/>
			<label className={style.textLabel} htmlFor={name}>
				{textLabel}
			</label>
		</div>
	);
};
