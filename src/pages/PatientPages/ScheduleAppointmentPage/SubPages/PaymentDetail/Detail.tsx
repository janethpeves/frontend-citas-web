import style from "./PaymentDetail.module.css";
export const Detail = ({ detail = "", value = "", icon = "" }) => {
	return (
		<div>
			<span className={style.txt__prop}>
				{detail}
				<img src={icon} alt="" style={{ marginLeft: "5px" }} />
			</span>
			<span className={style.txt__value}>{value}</span>
		</div>
	);
};
