import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import useAuthStore from "@/store/slices/auth/useAuthStore";
import { AppRouteMant } from "./AppRouteMant";
import { LoginPage } from "@/pages/LoginPage/LoginPage";

export function AppRoutes() {
  const { kibLevel, token, usuCod, PacName, login, logout, setUi } =
    useAuthStore();

  useEffect(() => {
    if (token && (kibLevel !== undefined || null)) {
      login(`${token}`, `${usuCod}`, PacName || "");
      setUi(kibLevel);
    } else {
      logout();
    }
  }, [kibLevel, token]);

  return (
    <BrowserRouter>
      <Routes>
        {!kibLevel || !token ? (
          <>
            {/* Ruta pública de Login */}
            <Route path="/login" element={<LoginPage />} />

            {/* Si el usuario intenta acceder a una ruta no autorizada, se redirige a Login */}
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            {/* Si el usuario está autenticado e intenta acceder al login, redirigir al home */}
            <Route path="/login" element={<Navigate to="/" />} />
            {/* Rutas protegidas, solo accesibles si el usuario está autenticado */}
            <Route path="/*" element={<AppRouteMant />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
