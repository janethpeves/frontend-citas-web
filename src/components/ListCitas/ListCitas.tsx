/* eslint-disable @typescript-eslint/no-explicit-any */
import style from "./ListCitas.module.css";
import { ItemList } from "./ItemList";
export const ListCitas = ({ citas }: any) => {
  return (
    <>
      <h1 className={style.h1}>Mis citas</h1>
      <section className={style.list__container}>
        {citas.map((cita: any) => (
          <ItemList
            data={cita}
          ></ItemList>
        ))}
      </section>
    </>
  );
};
