import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";

import useAlertStore, { alertStoreType } from "../../stores/AlertStore";

import "../authStyle.css";

type props = {
	id: string;
	title: string;
	index: number;
	createdAt?: Date;
	confirmDeleteFile: Function;
};

const FileListCard = ({
	id,
	index,
	title,
	createdAt,
	confirmDeleteFile,
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
			<Link to={`/editor/${id}`}>
				<div className="file-list-card-title">{title}</div>
				<div className="file-list-card-createdAt">
					{createdAt != undefined
						? new Date(createdAt).toLocaleDateString("en-GB")
						: ""}
				</div>
			</Link>
			<div className="file-list-card-options">
				<button
					className="btn btn-dark"
					onClick={() => confirmDeleteFile(id, index)}
				>
					Delete
				</button>
				<FontAwesomeIcon
					icon={faShare}
					onClick={share}
					style={{ opacity: "0.8", marginLeft: "10px", cursor: "pointer" }}
				/>
			</div>
		</div>
	);
};

export default FileListCard;
