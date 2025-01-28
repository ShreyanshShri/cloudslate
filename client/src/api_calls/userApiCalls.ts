import axios from "axios";
import useAlertStore from "../stores/AlertStore";

const setAlert = useAlertStore.getState().setAlert;

type return_type = {
	status: number;
	data: any;
};

const register = async (
	username: string,
	email: string,
	password: string
): Promise<return_type> => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_SERVER_URL}/auth/register`,
			{
				username,
				email,
				password,
			}
		);
		return {
			status: response.status,
			data: response.data,
		};
	} catch (err: any) {
		setAlert(err.response.data.message, "error");
		return {
			status: err.response.status,
			data: err.response.data,
		};
	}
};

const login = async (email: string, password: string): Promise<return_type> => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_SERVER_URL}/auth/login`,
			{
				email,
				password,
			}
		);
		return {
			status: response.status,
			data: response.data,
		};
	} catch (err: any) {
		setAlert(err.response.data.message, "error");
		return {
			status: err.response.status,
			data: err.response.data,
		};
	}
};

const getUser = async (): Promise<return_type> => {
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
		return {
			status: response.status,
			data: response.data,
		};
	} catch (err: any) {
		console.error(err.response.data);
		setAlert(err.response.data.message, "error");
		return {
			status: err.response.status,
			data: err.response.data,
		};
	}
};

const addRemoveBookmark = async (
	file_id: string,
	action: "add" | "remove"
): Promise<return_type> => {
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
		return {
			status: response.status,
			data: response.data,
		};
	} catch (err: any) {
		console.error(err.response.data.message);
		setAlert(err.response.data.message, "error");
		return {
			status: err.response.status,
			data: err.response.data,
		};
	}
};

const getBookmarkStatus = async (file_id: string): Promise<return_type> => {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_SERVER_URL}/auth/check-bookmark?id=${file_id}`,
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		return {
			status: response.status,
			data: response.data,
		};
	} catch (err: any) {
		console.error(err.response.data.message);
		setAlert(err.response.data.message, "error");
		return {
			status: err.response.status,
			data: err.response.data,
		};
	}
};

export { register, login, getUser, addRemoveBookmark, getBookmarkStatus };
