import axios from "axios";

import useAlertStore from "../../stores/AlertStore";
import useFileStore from "../../stores/FileStore";

const changeVisibility = async (id: string, isPublic: boolean) => {
	const setAlert = useAlertStore.getState().setAlert;
	const setFileVisibility = useFileStore.getState().setFileVisibility;

	try {
		const response = await axios.put(
			`${import.meta.env.VITE_SERVER_URL}/editor/edit/set-visibility?id=${id}`,
			{
				isPublic,
			},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		setFileVisibility(response.data.public);
	} catch (err: any) {
		setAlert(err.response.data.message, "error");
		console.error(err.response.data.message);
	}
};

const changeTitle = async (id: string, title: string) => {
	const setAlert = useAlertStore.getState().setAlert;

	if (title === "") return;
	try {
		const response = await axios.put(
			`${import.meta.env.VITE_SERVER_URL}/editor/edit/set-title?id=${id}`,
			{
				title,
			},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		setAlert(response.data.message, "success");
	} catch (err: any) {
		setAlert(err.response.data.message, "error");
		console.error(err.response.data.message);
	}
};

const changeDesc = async (id: string, desc: string) => {
	const setAlert = useAlertStore.getState().setAlert;

	if (desc === "") return;
	try {
		const response = await axios.put(
			`${import.meta.env.VITE_SERVER_URL}/editor/edit/set-desc?id=${id}`,
			{
				desc,
			},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		setAlert(response.data.message, "success");
	} catch (err: any) {
		setAlert(err.response.data.message, "error");
		console.error(err.response.data.message);
	}
};

const deleteFile = async (id: string): Promise<boolean> => {
	const clearConfirm = useAlertStore.getState().clearConfirm;
	const setAlert = useAlertStore.getState().setAlert;

	try {
		const response = await axios.delete(
			`${import.meta.env.VITE_SERVER_URL}/editor/delete?id=${id}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		clearConfirm();
		setAlert(response.data.message, "success");
		return true;
	} catch (err: any) {
		console.error(err.response.data);
		clearConfirm();
		setAlert(err.response.data.message, "error");
		return false;
	}
};

export { changeVisibility, changeTitle, changeDesc, deleteFile };
