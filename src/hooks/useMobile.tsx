import { useEffect, useState } from "react";

export const useMobile = () => {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 497);
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 497);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	return { isMobile, setIsMobile };
};
