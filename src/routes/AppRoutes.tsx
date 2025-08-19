import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppRouteMant } from "./AppRouteMant";
import { LoginPage } from "@/pages/LoginPage/LoginPage";
import { useAppSelector } from "@/store/hooks";

export function AppRoutes() {
  const { role } = useAppSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        {!role ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/*" element={<AppRouteMant />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
