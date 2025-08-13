import React from "react";
import styles from "./Sidebar.module.css";
import { Button } from "primereact/button";
import { useSidebarStore } from "@/store/slices/sidebar/useSidebarStore";
import { useNavigate } from "react-router-dom";

interface SidebarItemProps {
	icon: string;
	title: string;
	path: string;
	toggleSidebar: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, title, path, toggleSidebar }) => {
	const { isSidebarOpen } = useSidebarStore();
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(path);
		toggleSidebar();
	};

	return (
		<Button
			className={`${styles.bg__button} ${styles.navItem}`}
			onClick={handleClick}
			title={title}
			aria-label={title}
		>
			<img
				src={icon}
				alt=""
				aria-hidden="true"
				className={styles.navIcon}
				style={!isSidebarOpen ? { marginLeft: "15px" } : {}}
			/>
			<span className={`${styles.titleRoute} ${isSidebarOpen ? styles.visible : ""}`}>{title}</span>
		</Button>
	);
};
