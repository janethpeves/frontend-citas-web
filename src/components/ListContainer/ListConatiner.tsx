/* eslint-disable @typescript-eslint/no-explicit-any */
import style from "./ListContainer.module.css";
export const ListConatiner = ({ children }: any) => {
	return <div className={style.list__container}>{children}</div>;
};
