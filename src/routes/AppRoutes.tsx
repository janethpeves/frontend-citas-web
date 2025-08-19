import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppRouteMant } from "./AppRouteMant";
import { LoginPage } from "@/pages/LoginPage/LoginPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* {!kibLevel || !token ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/*" element={<AppRouteMant />} />
          </>
        )} */}

        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<AppRouteMant />} />
          {/* <Route path="/*" element={<Navigate to="/login" />} /> */}
        </>
      </Routes>
    </BrowserRouter>
  );
}
