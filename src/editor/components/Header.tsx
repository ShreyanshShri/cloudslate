import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";

import useFileStore from "../../stores/FileStore";
import useEditHistoryStore from "../../stores/EditsHistoryStore";
import useAlertStore from "../../stores/AlertStore";

import "./layout.css";

const Header = () => {
	const [title, setTitle] = useState<string>("");
	const [changed, setChanged] = useState<boolean>(false);
	const [isPublic, setIsPublic] = useState<boolean>(false);

	const { id } = useParams();
	const file = useFileStore((state: any) => state.file);
	const setFileVisibility = useFileStore(
		(state: any) => state.setFileVisibility
	);
	const pushToServer = useEditHistoryStore(
		(state: any) => state.pushToServer
	);
	const hardSave = useEditHistoryStore((state: any) => state.hardSave);
	const historyLength = useEditHistoryStore(
		(state: any) => state.history.length
	);
	const setAlert = useAlertStore((state: any) => state.setAlert);

	useEffect(() => {
		setTitle(file.title);
		setIsPublic(file.public);
		console.log(file.public);
	}, [file]);

	useEffect(() => {
		if (historyLength % 5 == 0) {
			pushToServer(id);
		}
	}, [historyLength]);

	useEffect(() => {
		const titleInterval = setInterval(() => {
			if (!changed) return;
			pushTitleChangeToServer();
		}, 2000);

		const saveInterval = setInterval(() => {
			if (historyLength !== 0) {
				pushToServer(id);
			}
		}, 10000);

		return () => {
			clearInterval(titleInterval);
			clearInterval(saveInterval);
		};
	}, []);

	const pushTitleChangeToServer = async () => {
		if (title === "") return;
		try {
			await axios.put(
				`${
					import.meta.env.VITE_SERVER_URL
				}/editor/edit/set-title?id=${id}`,
				{
					title,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			setChanged(false);
		} catch (err: any) {
			setAlert(err.response.data.message, "error");
			console.error(err.response.data.message);
		}
	};

	const changeVisibility = async () => {
		try {
			const response = await axios.put(
				`${
					import.meta.env.VITE_SERVER_URL
				}/editor/edit/set-visibility?id=${id}`,
				{
					isPublic: !isPublic,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);
			setFileVisibility(response.data.public);
		} catch (err: any) {
			setAlert(err.response.data.message, "error");
			console.error(err.response.data.message);
		}
	};

	const handleNameChange = (e: any) => {
		setTitle(e.target.value);
		setChanged(true);
	};

	return (
		<div id="header">
			<div>
				<span id="heading">Cloud Slate</span>
			</div>
			<div id="header-center">
				<input type="text" value={title} onChange={handleNameChange} />
				<span id="createdAt">
					{moment(file?.createdAt).format("DD-MM-YYYY")}
				</span>
			</div>
			<div id="header-left">
				<span id="saved-status">
					{historyLength === 0 ? "Saved" : "Unsaved"}
				</span>
				<button className="btn-dark" onClick={() => hardSave(id)}>
					Save
				</button>
				<label className="switch" title="Make public">
					<input
						type="checkbox"
						checked={isPublic}
						onChange={changeVisibility}
					/>
					<span className="slider round"></span>
				</label>
			</div>
		</div>
	);
};

export default Header;
