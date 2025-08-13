import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { Button } from "primereact/button";
import { SidebarItem } from "./SidebarItem";
import exitIcon from "@/assets/icons/Sidebar/exit.svg";
import logoIcon from "@/assets/icons/Sidebar/logo.svg";
import arrowIcon from "@/assets/icons/Sidebar/arrowLeft.svg";
import {
  appRoutesDirectivo,
  appRoutesPatient,
  appRoutesProf,
} from "@/data/Route";
import { useSidebarStore } from "@/store/slices/sidebar/useSidebarStore";
import useAuthStore from "@/store/slices/auth/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

export const Sidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore();
  const { kibLevel, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      isMobile && isSidebarOpen ? "hidden" : "auto";
  }, [isMobile, isSidebarOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getCurrentRoutes = () => {
    switch (kibLevel) {
      case "Professional":
        return appRoutesProf;
      case "Patient":
        return appRoutesPatient;
      case "Administrative":
        return appRoutesDirectivo;
      default:
        return [];
    }
  };

  return (
    <>
      {isMobile && (
        <button
          className={styles.mobileMenuBtn}
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <Menu size={24} color="white" />
        </button>
      )}

      <aside
        className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""} ${
          isMobile ? styles.mobile : ""
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={styles.sidebar__container}>
          <div className={styles.elements__container}>
            <div
              className={styles.content__button}
              style={
                !isSidebarOpen ? { marginLeft: "10px" } : { marginLeft: "10px" }
              }
            >
              <div className={styles.logo}>
                <img src={logoIcon} alt="logo" />
              </div>
              <Button
                className={styles.button__Sidebar}
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
              >
                <img
                  src={arrowIcon}
                  alt="toggle sidebar"
                  className={`${styles.arrowIcon} ${isSidebarOpen ? styles.rotated : ""}`}
                />
              </Button>
            </div>

            <nav className={styles.buttons__container}>
              {getCurrentRoutes().map((route, index) => (
                <SidebarItem
                  key={index}
                  icon={route.icon}
                  title={route.title}
                  path={route.path}
                  toggleSidebar={isMobile ? toggleSidebar : () => {}}
                />
              ))}
            </nav>
          </div>

          <Button
            className={styles.bg__button}
            onClick={handleLogout}
            aria-label="Cerrar Sesión"
            style={!isSidebarOpen ? { marginLeft: "10px" } : {}}
          >
            <img src={exitIcon} alt="exit" />
            <span
              className={`${styles.titleRoute} ${isSidebarOpen ? styles.visible : ""}`}
            >
              Cerrar Sesión
            </span>
          </Button>
        </div>
      </aside>

      {isMobile && isSidebarOpen && (
        <div
          className={styles.overlay}
          onClick={toggleSidebar}
          role="button"
          aria-label="Cerrar menú"
          tabIndex={0}
        />
      )}
    </>
  );
};
