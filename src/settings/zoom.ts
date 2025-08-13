import moment from "moment";

export const zoomParameters = (Servhosdes: string, fecha: any) => {
	return {
		grant_type: "refresh_token",
		topic: "Reunión " + `${Servhosdes} - ${moment(fecha).format("YYYY-MM-DD")}`,
		type: 2,
		start_time: fecha,
		duration: 60,
		settings: {
			host_video: true,
			participant_video: true,
			join_before_host: true,
			participant_can_share: true,
			allow_multiple_participants_can_share_simultaneously: true,
		},
	};
};
