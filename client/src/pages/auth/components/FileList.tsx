import { useState, useEffect } from "react";
import useUserStore, { UserStoreTypes } from "../../../stores/UserStore";
import useAlertStore, { alertStoreType } from "../../../stores/AlertStore";
import { removeDeletedFile } from "../component_functions/profilePage";
import { file_type } from "../../../types/fileTypes";

import FileListCard from "./FileListCard";

type props = {
	confirmDeleteFile: Function;
};

const FileList = ({ confirmDeleteFile }: props) => {
	const confirm = useAlertStore((state: alertStoreType) => state.confirm);
	const [deleteData, setDeleteData] = useState<object>({
		id: null,
		index: null,
	});
	const user = useUserStore((state: UserStoreTypes) => state.user);

	useEffect(() => {
		removeDeletedFile(confirm, deleteData, setDeleteData);
	}, [confirm]);

	return (
		<div id="FileList">
			{user.files.length !== 0
				? user.files.map((file: file_type, index: number) => (
						<FileListCard
							key={index}
							index={index}
							id={file._id}
							title={file.title}
							desc={file.desc}
							createdAt={file.createdAt}
							confirmDeleteFile={confirmDeleteFile}
							setDeleteData={setDeleteData}
						/>
				  ))
				: "No Files found."}
		</div>
	);
};

export default FileList;
