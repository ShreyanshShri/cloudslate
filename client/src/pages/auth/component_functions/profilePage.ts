import { deleteFile } from "../../common/utils/apiCalls";
import { getUser, addRemoveBookmark } from "../../../api_calls/userApiCalls";
import { file_type } from "../../../types/fileTypes";
import useAlertStore from "../../../stores/AlertStore";
import useUserStore from "../../../stores/UserStore";

const setConfirm = useAlertStore.getState().setConfirm;
const setUser = useUserStore.getState().setUser;

export const confirmDeleteFile = (
	id: string,
	index: number,
	setDeleteData: Function
) => {
	setConfirm("Are you sure you want to delete this file");
	setDeleteData({
		id,
		index,
	});
};

export const removeDeletedFile = async (
	confirm: any,
	deleteData: any,
	setDeleteData: Function
) => {
	const user = useUserStore.getState().user;
	if (confirm.hasResponded) {
		if (confirm.response === true) {
			const res = await deleteFile(deleteData.id as string);
			if (res == true) {
				let filtered: file_type[] = [];
				for (let x = 0; x < user.files.length; x++) {
					if (x !== deleteData.index) filtered.push(user.files[x]);
				}
				console.log(user.files);
				console.log(filtered);
				setUser({
					files: filtered,
				});
				setDeleteData({
					id: null,
					index: null,
				});
			} else {
				setDeleteData({
					id: null,
					index: null,
				});
			}
		}
	}
};

export const getUserAndUpdateUI = async (
	setRedirect: Function,
	setLoading: Function
) => {
	const res = await getUser();
	if (res.status == 200) {
		setUser(res.data.user);
		setLoading(() => false);
	} else {
		setRedirect(true);
	}
};

export const unBookmark = async (file_id: string, index: number) => {
	const user = useUserStore.getState().user;
	const res = await addRemoveBookmark(file_id, "remove");
	if (res.status == 200) {
		let filtered: file_type[] = [];
		for (let x = 0; x < user.bookmarks.length; x++) {
			if (x !== index) filtered.push(user.bookmarks[x]);
		}
		console.log(filtered);
		setUser({
			bookmarks: filtered,
		});
	}
};

export const logOut = (setRedirect: Function) => {
	localStorage.setItem("token", "");
	localStorage.setItem("user_id", "");
	setRedirect(true);
};
