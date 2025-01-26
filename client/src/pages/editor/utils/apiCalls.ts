import axios from "axios";

import useAlertStore from "../../../stores/AlertStore";
import useFileStore from "../../../stores/FileStore";
import { user_type } from "../../../types/fileTypes";

const addRemoveContributor = async (
	file_id: string,
	username: string,
	type: "add" | "remove"
) => {
	const file = useFileStore.getState().file;
	const setContributorsList = useFileStore.getState().setContributorsList;
	const setAlert = useAlertStore.getState().setAlert;

	try {
		const response = await axios.put(
			`${
				import.meta.env.VITE_SERVER_URL
			}/editor/edit/${type}-contributor?id=${file_id}`,
			{
				username,
			},
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			}
		);
		let updatedList = [];
		if (type === "remove") {
			updatedList = file.contributors.filter(
				(contributor: any) => contributor.username != username
			);
		} else {
			updatedList = [
				...file.contributors,
				{
					username: response.data.contributor.username,
					email: response.data.contributor.email,
				},
			];
		}
		setContributorsList(updatedList as user_type[]);
	} catch (err: any) {
		console.error(err.response.data.message);
		setAlert(err.response.data.message, "error");
	}
};

export { addRemoveContributor };
