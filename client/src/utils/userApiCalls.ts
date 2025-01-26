import axios from "axios";
import useAlertStore from "../stores/AlertStore";

const getUser = async (): Promise<any> => {
	const setAlert = useAlertStore.getState().setAlert;
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_SERVER_URL}/auth/get`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		console.log(response.data);
		return response.data.user;
	} catch (err: any) {
		console.error(err.response.data);
		setAlert(err.response.data.message, "error");
		return {
			error: true,
		};
	}
};

const addRemoveBookmark = async (
	file_id: string,
	action: "add" | "remove"
): Promise<boolean> => {
	const setAlert = useAlertStore.getState().setAlert;

	try {
		const response = await axios.post(
			`${
				import.meta.env.VITE_SERVER_URL
			}/auth/${action}-bookmark?id=${file_id}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data.status;
	} catch (err: any) {
		console.error(err.response.data.message);
		setAlert(err.response.data.message, "error");
		return false;
	}
};

const getBookmarkStatus = async (file_id: string): Promise<boolean> => {
	const setAlert = useAlertStore.getState().setAlert;

	try {
		const response = await axios.get(
			`${import.meta.env.VITE_SERVER_URL}/auth/check-bookmark?id=${file_id}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return response.data.status;
	} catch (err: any) {
		console.error(err.response.data.message);
		setAlert(err.response.data.message, "error");
		return false;
	}
};

export { getUser, addRemoveBookmark, getBookmarkStatus };
