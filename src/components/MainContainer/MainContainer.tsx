import React, { useEffect, useState } from "react";
import style from "./MainContainer.module.css";
import { useSidebarStore } from "@/store/slices/sidebar/useSidebarStore";

export const MainContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { isSidebarOpen } = useSidebarStore();
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	return (
		<section
			className={style.bg__container}
			style={{ marginLeft: isSidebarOpen ? "auto" : "auto" }}
		>
			<section
				style={isMobile ? { borderTopLeftRadius: "unset", borderBottomLeftRadius: "unset" } : {}}
				className={style.MainContainer}
			>
				{children}
			</section>
		</section>
	);
};
