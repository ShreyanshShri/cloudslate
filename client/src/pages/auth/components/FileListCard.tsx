import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faShare,
	faBookmark,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";

import useAlertStore, { alertStoreType } from "../../../stores/AlertStore";

import "../authStyle.css";

type props = {
	id: string;
	title: string;
	desc?: string;
	index: number;
	createdAt?: Date;
	confirmDeleteFile?: Function;
	unBookmark?: Function;
	setDeleteData?: any;
};

const FileListCard = ({
	id,
	index,
	title,
	desc,
	createdAt,
	confirmDeleteFile,
	unBookmark,
	setDeleteData,
}: props) => {
	const setAlert = useAlertStore((state: alertStoreType) => state.setAlert);

	const share = () => {
		if (navigator.share) {
			navigator
				.share({
					title,
					url: `${window.location.origin}/view/${id}`,
				})
				.then(() => {
					// do nothing
				})
				.catch(console.error);
		} else {
			navigator.clipboard.writeText(`${window.location.origin}/view/${id}`);
			setAlert("Link copied to clipboard", "success");
		}
	};

	return (
		<div className="file-list-card">
			<Link to={`/editor/${id}`} className="file-list-card-link">
				<div className="file-list-card-title">{title}</div>
				<div className="file-list-card-createdAt">
					{createdAt != undefined
						? new Date(createdAt).toLocaleDateString("en-GB")
						: ""}
				</div>
				<div className="file-list-card-desc">{desc}</div>
			</Link>
			<div className="file-list-card-options">
				{confirmDeleteFile && (
					<FontAwesomeIcon
						icon={faTrash}
						onClick={() => confirmDeleteFile(id, index, setDeleteData)}
						className="file-list-card-icon delete-icon"
						title="Delete this File"
					/>
				)}
				{unBookmark && (
					<FontAwesomeIcon
						icon={faBookmark}
						onClick={() => unBookmark(id, index)}
						className="file-list-card-icon"
						title="Bookmarked"
					/>
				)}
				<FontAwesomeIcon
					icon={faShare}
					onClick={share}
					className="file-list-card-icon"
					title="Share"
				/>
			</div>
		</div>
	);
};

export default FileListCard;
