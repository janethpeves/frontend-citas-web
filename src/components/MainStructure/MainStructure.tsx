/* eslint-disable @typescript-eslint/no-explicit-any */
import style from "./MainStructure.module.css";

export const MainStructure = ({ children }:any) => {
  return <section className={style.MainStructure}>{children}</section>;
};
