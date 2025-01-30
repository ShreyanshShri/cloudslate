import axios from "axios";
import useAlertStore from "../../stores/AlertStore";

const deleteFile = async (id: string) => {
	const clearConfirm = useAlertStore.getState().clearConfirm;
	const setAlert = useAlertStore.getState().setAlert;

	try {
		const response = await axios.delete(
			`${import.meta.env.VITE_HTTP_URL}/editor/delete?id=${id}`,
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

export { deleteFile };
