import { useEffect, useState } from "react";
import { file_type } from "../../../types/fileTypes";

import {
	removeDeletedFile,
	unBookmark,
} from "../component_functions/profilePage";
import useAlertStore, { alertStoreType } from "../../../stores/AlertStore";
import useUserStore, { UserStoreTypes } from "../../../stores/UserStore";

import FileListCard from "./FileListCard";

type props = {
	// confirmDeleteFile: Function;
};

const FileList = ({}: props) => {
	const confirm = useAlertStore((state: alertStoreType) => state.confirm);
	const user = useUserStore((state: UserStoreTypes) => state.user);
	const [deleteData, setDeleteData] = useState<object>({
		id: null,
		index: null,
	});

	useEffect(() => {
		removeDeletedFile(confirm, deleteData, setDeleteData);
	}, [confirm]);

	return (
		<div id="FileList">
			{user.bookmarks.length !== 0
				? user.bookmarks.map((file: file_type, index: number) => (
						<FileListCard
							key={index}
							index={index}
							id={file._id}
							title={file.title}
							desc={file.desc}
							createdAt={file.createdAt}
							unBookmark={unBookmark}
							setDeleteData={setDeleteData}
						/>
				  ))
				: "No Bookmarks Found."}
		</div>
	);
};

export default FileList;
