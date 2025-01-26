import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faGear, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";

import useFileStore from "../../../stores/FileStore";
import useEditHistoryStore from "../../../stores/EditsHistoryStore";
import useSettingsStore from "../../../stores/SettingsStore";

import {
	addRemoveBookmark,
	getBookmarkStatus,
} from "../../../utils/userApiCalls";

import "./layout.css";

const Header = () => {
	const [bookmarked, setBookmarked] = useState<boolean>(false);

	const { id } = useParams();
	const file = useFileStore((state: any) => state.file);
	const pushToServer = useEditHistoryStore((state: any) => state.pushToServer);
	const hardSave = useEditHistoryStore((state: any) => state.hardSave);
	const historyLength = useEditHistoryStore(
		(state: any) => state.history.length
	);
	const setDisplaySettings = useSettingsStore(
		(state: any) => state.setDisplaySettings
	);

	// get initial bookmark value
	useEffect(() => {
		const getInitialBookmarkStatus = async () => {
			const res = await getBookmarkStatus(id as string);
			setBookmarked(res);
		};
		getInitialBookmarkStatus();
	}, []);

	// push edit changes to server;
	useEffect(() => {
		if (historyLength % 5 == 0) {
			pushToServer(id);
		}

		const saveInterval = setInterval(() => {
			if (historyLength !== 0) {
				pushToServer(id);
			}
		}, 7000);

		return () => {
			clearInterval(saveInterval);
		};
	}, [historyLength]);

	// handle bookmark button click
	const handleBookmarkClick = async () => {
		console.log("handling bookmark click");
		const res = await addRemoveBookmark(
			id as string,
			bookmarked ? "remove" : "add"
		);
		setBookmarked(res);
	};

	return (
		<div id="header">
			<div>
				<span id="heading">Cloud Slate</span>
			</div>
			<div id="header-center">
				<span id="header-title">{file.title}</span>
				<span id="createdAt">
					{moment(file?.createdAt).format("DD-MM-YYYY")}
				</span>
			</div>
			<div id="header-left">
				<span id="saved-status">
					{historyLength === 0 ? "Saved" : "Unsaved"}
				</span>
				<button className="action-btn btn-dark" onClick={() => hardSave(id)}>
					Save
				</button>
				<FontAwesomeIcon
					title={bookmarked ? "Bookmarked" : "Bookmark"}
					className="header-icon"
					icon={bookmarked ? faBookmark : faBookmarkRegular}
					onClick={() => handleBookmarkClick()}
				/>
				<FontAwesomeIcon
					title="Editor Settings"
					className="header-icon"
					icon={faGear}
					onClick={() => setDisplaySettings(true)}
				/>
				<Link to={`/view/${id}`} id="eye-emoji" title="View Mode">
					<FontAwesomeIcon
						title="Open in view-mode"
						className="header-icon"
						icon={faEye}
					/>
				</Link>
			</div>
		</div>
	);
};

export default Header;
