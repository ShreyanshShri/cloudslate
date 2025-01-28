import { create } from "zustand";
import zukeeper from "zukeeper";

import { user_type } from "../types/userTypes";
import { file_type } from "../types/fileTypes";

export type UserStoreTypes = {
	user: user_type;
	setUser: (user_obj: setUserType) => void;
};
type setUserType = {
	id?: string;
	username?: string;
	email?: string;
	files?: file_type[];
	bookmarks?: file_type[];
};

const setUser = (
	set: any,
	{ id, username, email, files, bookmarks }: setUserType
) => {
	set((state: UserStoreTypes) => ({
		...state,
		user: {
			id: id ? id : state.user.id,
			username: username ? username : state.user.username,
			email: email ? email : state.user.email,
			files: files ? files : state.user.files,
			bookmarks: bookmarks ? bookmarks : state.user.bookmarks,
		},
	}));
};

const useUserStore = create<UserStoreTypes>(
	zukeeper((set: any) => ({
		user: {
			id: "",
			username: "",
			email: "",
			files: [],
			bookmarks: [],
		},
		setUser: (user_obj: setUserType) => setUser(set, user_obj),
	}))
);

window.store = useUserStore;

export default useUserStore;
