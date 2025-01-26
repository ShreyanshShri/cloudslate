import { file_type } from "../../../types/fileTypes";

import FileListCard from "./FileListCard";

type props = {
	confirmDeleteFile: Function;
	user: any;
};

const FileList = ({ confirmDeleteFile, user }: props) => {
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
						/>
				  ))
				: "No Files found."}
		</div>
	);
};

export default FileList;
