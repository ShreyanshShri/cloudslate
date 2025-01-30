import { useEffect, useState } from "react";
import useFileStore, { fileStoreType } from "../../../../../stores/FileStore";

import "../widgets.css";

type props = {
	message?: string;
	sender?: string;
	time?: string;
};

const MessageCard = ({ message, sender, time }: props) => {
	const file = useFileStore((state: fileStoreType) => state.file);
	const [username, setusername] = useState<string>("");

	useEffect(() => {
		findAndSetUsername();
	}, []);

	const findAndSetUsername = () => {
		if (file.admin._id == sender) {
			setusername(file.admin.username);
			return;
		}
		for (const contributor of file.contributors) {
			if (contributor._id == sender) {
				setusername(contributor.username);
				return;
			}
		}
	};

	return (
		<div className="message-card">
			<div className="message">{message}</div>
			<div className="details">
				<span className="msg-sender">{username}</span>
				<span className="msg-time">{time}</span>
			</div>
		</div>
	);
};

export default MessageCard;
