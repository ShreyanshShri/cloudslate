import { file_type } from "../../../types/fileTypes";

import FileListCard from "./FileListCard";

type props = {
	// confirmDeleteFile: Function;
	unBookmark: Function;
	user: any;
};

const FileList = ({ user, unBookmark }: props) => {
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
						/>
				  ))
				: "No Bookmarks Found."}
		</div>
	);
};

export default FileList;
