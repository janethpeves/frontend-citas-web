import style from "./ResultPage.module.css";
import nerves from "@/assets/icons/results/nerves.svg";
import trace from "@/assets/icons/results/trace.svg";
import lungs from "@/assets/icons/results/lungs.svg";
import { useNavigate } from "react-router-dom";

export const ResultsPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <h1 className={style.content__title}>Mis Resultados</h1>
            <div className={style.cardsContainer}>
                {data.map((data, index: number) => (
                    <div 
                        key={index} 
                        className={style.card} 
                        onClick={() => navigate("/resultados/" + `${index + 1}`)}
                    >
                        <div className={style.card__img}>
                            <img src={data.img} className={style.img} alt={data.title} />
                        </div>
                        <div className={style.content}>
                            <div className={style.title__div}>
                                <div className={style.title}>
                                    <p>{data.title}</p>
                                </div>
                                <div className={style.date}>
                                    <label>{data.date}</label>
                                    <p>{data.updated}</p>
                                </div>
                            </div>
                            <div className={style.description}>{data.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

const data = [
    {
        img: trace,
        title: "Imagenologia",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        date: "05, Mayo",
        updated: "Ultima Actualización",
    },
    {
        img: nerves,
        title: "Anatomia Patologica",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        date: "05, Mayo",
        updated: "Ultima Actualización",
    },
    {
        img: lungs,
        title: "Laboratorio",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
        date: "05, Mayo",
        updated: "Ultima Actualización",
    },
];