import React from "react";
import { ListConatiner } from "../ListContainer/ListConatiner";

import { ItemDoctor } from "./ItemDoctor";

interface ListDoctorProps {
	data: any[];
	selectedDoctor: string | null;
	onSelectDoctor: (doctorName: string) => void;
}

export const ListDoctor: React.FC<ListDoctorProps> = ({ data, selectedDoctor, onSelectDoctor }) => {
	return (
		<ListConatiner>
			{data.map((doctor, index) => (
				<ItemDoctor
					doctor={doctor}
					key={index}
					isSelected={selectedDoctor === doctor.name}
					onSelect={() => onSelectDoctor(doctor.name)}
				/>
			))}
		</ListConatiner>
	);
};
