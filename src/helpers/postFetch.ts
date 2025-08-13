/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { mainApi } from "@/connections/api";

export const postFetch = async (
	path: string,
	data: any,
	customApi?: string,
	customToken?: string,
	queryParams?: string
) => {
	try {
		const token = localStorage.getItem("rt__kib_citas");
		const headers = {
			Authorization: `Bearer ${customToken ? customToken : token}`,
		};
		const resp = await axios.post(
			`${customApi ? customApi : mainApi}${path}${queryParams ? queryParams : ""}`,
			data,
			{
				headers,
			}
		);
		return resp;
	} catch (error) {
		console.error(error);
	}
};
