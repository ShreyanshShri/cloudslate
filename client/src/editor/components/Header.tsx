import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faGear } from "@fortawesome/free-solid-svg-icons";

import useFileStore from "../../stores/FileStore";
import useEditHistoryStore from "../../stores/EditsHistoryStore";

import "./layout.css";
import useSettingsStore from "../../stores/SettingsStore";

const Header = () => {
	const [title, setTitle] = useState<string>("");

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

	useEffect(() => {
		setTitle(file.title);
	}, [file]);

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

	return (
		<div id="header">
			<div>
				<span id="heading">Cloud Slate</span>
			</div>
			<div id="header-center">
				<span id="header-title">{title}</span>
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
					title="Editor Settings"
					id="header-settings-icon"
					icon={faGear}
					onClick={() => setDisplaySettings(true)}
				/>
				<Link to={`/view/${id}`} id="eye-emoji" title="View Mode">
					<FontAwesomeIcon icon={faEye} />
				</Link>
			</div>
		</div>
	);
};

export default Header;
