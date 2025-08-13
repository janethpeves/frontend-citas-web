import { useState } from 'react';
import Servicios from './components/Servicios/Servicios';
import Especialidades from './components/Especialidades/Especialidades';
import Indicadores from './components/Indicadores/Indicadores';
import DetalleIndicador from './components/DetalleIndicador/DetalleIndicador';

const DashboardExecutive = () => {
  const [servicioSeleccionado, setServicioSeleccionado] = useState(false);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState(null);
  const [indicadorSeleccionado, setIndicadorSeleccionado] = useState(null);

  const handleBackToServicios = () => {
    setServicioSeleccionado(false);
    setEspecialidadSeleccionada(null);
    setIndicadorSeleccionado(null);
  };

  return (
    <div>
      {!servicioSeleccionado && <Servicios onSelectServicio={() => setServicioSeleccionado(true)} />}
      {servicioSeleccionado && !especialidadSeleccionada && <Especialidades onSelectEspecialidad={setEspecialidadSeleccionada} />}
      {especialidadSeleccionada && !indicadorSeleccionado && <Indicadores onSelectIndicador={setIndicadorSeleccionado} />}
      {indicadorSeleccionado && <DetalleIndicador indicador={indicadorSeleccionado} onBack={handleBackToServicios} />}
    </div>
  );
};

export default DashboardExecutive;
