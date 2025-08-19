import style from "./AppRoutes.module.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Dashboard } from "@/pages/PatientPages/Dashboard/Dashboard";
import { MainStructure } from "@/components/MainStructure/MainStructure";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { MainContainer } from "@/components/MainContainer/MainContainer";
import { RecetasPage } from "@/pages/PatientPages/Recetas/RecetasPage";
import { ResultsPage } from "@/pages/PatientPages/ResultsPage/ResultsPage";
import { ScheduleAppointmentPage } from "@/pages/PatientPages/ScheduleAppointmentPage/ScheduleAppointmentPage";
import { Profile } from "@/pages/Profile/Profile";

import { HeaderSearch } from "@/components/HeaderSearch/HeaderSearch";
import { DetailResult } from "@/pages/PatientPages/ResultsPage/SubPage/DetailPage";
import { MedicalDashboard } from "@/pages/ProfessionalPages/Dashboard/Dashboard";
import { Patients } from "@/pages/ProfessionalPages/Patients/Patients";
import { Hospitalizacion } from "@/pages/ProfessionalPages/hospitalizacion/Hospitalizacion";
import { Programacion } from "@/pages/ProfessionalPages/programacion/Programacion";
import { useAppSelector } from "@/store/hooks";

import { AdministrativeDashboard } from "@/pages/AdministrativePages/Dashboard/Dashboard";
import { Servicios } from "@/pages/AdministrativePages/Servicios/Servicios";
import { Atenciones } from "@/pages/PatientPages/Atenciones/Atenciones";
// import useAuthStore from "@/store/slices/auth/useAuthStore";
// import { useSidebarStore } from "@/store/slices/sidebar/useSidebarStore";

export const AppRouteMant = () => {
  // Hook para obtener la ruta actual
  const location = useLocation();
  const { role } = useAppSelector((state) => state.auth);

  // const { isSidebarOpen } = useSidebarStore();
  const isSidebarOpen = false;
  return (
    <>
      {role === "Professional" && (
        <MainStructure>
          <div className={style.sidebar}>
            <Sidebar />
          </div>
          <MainContainer>
            <section
              className={`${style.body} ${
                isSidebarOpen ? style.sidebarOpen : ""
              }`}
            >
              {/* Condicional para no renderizar HeaderSearch si la ruta es /agendar-cita */}
              {location.pathname !== "/agendar-cita" && (
                <HeaderSearch isHidden />
              )}
              <Routes>
                <Route path="/" element={<MedicalDashboard />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/Pacientes" element={<Patients />} />
                <Route path="/hospitalizacion" element={<Hospitalizacion />} />
                <Route path="/programacion" element={<Programacion />} />
                <Route path="/*" element={<Navigate to="/" />} />
              </Routes>
            </section>
          </MainContainer>
        </MainStructure>
      )}
      {role === "Patient" && (
        <MainStructure>
          <div className={style.sidebar}>
            <Sidebar />
          </div>
          <MainContainer>
            <section
              className={`${style.body} ${
                isSidebarOpen ? style.sidebarOpen : ""
              }`}
            >
              {location.pathname !== "/agendar-cita" && <HeaderSearch />}
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/recetas" element={<RecetasPage />} />
                <Route path="/atenciones" element={<Atenciones />} />
                <Route path="/resultados" element={<ResultsPage />} />
                <Route path="/resultados/:id" element={<DetailResult />} />
                <Route
                  path="/agendar-cita"
                  element={<ScheduleAppointmentPage />}
                />
                <Route path="/*" element={<Navigate to="/" />} />
              </Routes>
            </section>
          </MainContainer>
        </MainStructure>
      )}

      {role === "Administrative" && (
        <MainStructure>
          <div className={style.sidebar}>
            <Sidebar />
          </div>
          <MainContainer>
            <section
              className={`${style.body} ${
                isSidebarOpen ? style.sidebarOpen : ""
              }`}
            >
              {location.pathname !== "/agendar-cita" && (
                <HeaderSearch isHidden />
              )}
              <Routes>
                <Route path="/" element={<AdministrativeDashboard />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/servicios" element={<Servicios />} />

                <Route path="/*" element={<Navigate to="/" />} />
              </Routes>
            </section>
          </MainContainer>
        </MainStructure>
      )}
    </>
  );
};
