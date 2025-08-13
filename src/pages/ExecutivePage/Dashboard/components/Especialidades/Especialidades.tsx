/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './Especialidades.module.css';

const Especialidades = ({ onSelectEspecialidad }: any) => {
  const especialidades = [
    'Consulta Externa',
    'Hospitalizacion',
    'Emergencia',
    'Centro Quirurgico',
    'Centro Obstetrico',
    'Diagnostico por imagen',
  ];

  return (
    <div className={styles.container}>
      <h2>Reporte de Indicadores</h2>
      <div className={styles.grid}>
        {especialidades.map((especialidad, index) => (
          <div key={index} className={styles.card} onClick={() => onSelectEspecialidad(especialidad)}>
            {especialidad}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Especialidades;
