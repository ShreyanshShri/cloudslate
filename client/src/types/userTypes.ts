import { file_type } from "./fileTypes";

export type user_type = {
	id: string;
	username: string;
	email: string;
	files: file_type[];
	bookmarks: file_type[];
};
