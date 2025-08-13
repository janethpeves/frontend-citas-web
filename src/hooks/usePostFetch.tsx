/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { mainApi } from "@/connections/api";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { setToast } from "@/store/slices/toast/toastSlice";

interface PostDataResponse {
	data: any;
}

export const usePostFetch = (
	endPoint: string,
	summary?: string | null,
	detail?: string | null,
	reloadFetchData?: () => void
) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);

	const [errorPost, setErrorPost] = useState<any>(null);
	const [successPost, setSuccessPost] = useState<boolean>(false);
	const [response, setResponse] = useState<any>([]);
	const setInitStatePost = () => {
		setIsLoadingPost(false);
		setErrorPost(null);
		setSuccessPost(false);
	};

	useEffect(() => {
		if (successPost) {
			if (summary || detail) {
				dispatch(
					setToast({
						severity: "success",
						summary: `${summary}`,
						detail: `${detail}`,
					})
				);
			}

			setInitStatePost();
			if (reloadFetchData) {
				reloadFetchData();
			}
		} else {
			if (errorPost !== null) {
				dispatch(
					setToast({
						severity: "error",
						summary: `Something went wrong`,
						detail: `${errorPost}`,
					})
				);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [successPost, errorPost]);

	const postFetchData = async (
		data: any,
		query?: string,
		pathUrl?: string,
		isBlob?: boolean
	): Promise<any> => {
		try {
			setIsLoadingPost(true);

			const token = localStorage.getItem("rt__kib_citas");
			const headers = {
				Authorization: `Bearer ${token}`,
			};

			let resp: AxiosResponse<PostDataResponse>;
			if (!isBlob) {
				resp = await axios.post(`${mainApi}${endPoint}${query ? `?${query}` : ""}`, data, {
					headers,
				});
			} else {
				resp = await axios.post(`${mainApi}${endPoint}${query ? `?${query}` : ""}`, data, {
					headers,
					responseType: "blob",
				});
			}

			setIsLoadingPost(false);
			setSuccessPost(true);

			if (pathUrl) {
				setTimeout(() => {
					navigate(pathUrl);
				}, 500);
			}
			setResponse(resp.data);
			return resp.data;
		} catch (error: any) {
			setIsLoadingPost(false);
			setErrorPost(error?.response.data.error);
		}
	};

	return {
		postFetchData,
		isLoadingPost,
		response,
	};
};
