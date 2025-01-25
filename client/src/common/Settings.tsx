import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import useSettingsStore, { settingsStoreType } from "../stores/SettingsStore";
import useFileStore, { fileStoreType } from "../stores/FileStore";
import useAlertStore, { alertStoreType } from "../stores/AlertStore";

import {
	changeVisibility,
	changeTitle,
	changeDesc,
	deleteFile,
} from "./utils/apiCalls";

import "./common_styles.css";

const Settings = () => {
	const file = useFileStore((state: fileStoreType) => state.file);
	const confirm = useAlertStore((state: alertStoreType) => state.confirm);
	const setConfirm = useAlertStore((state: alertStoreType) => state.setConfirm);
	const { id } = useParams();

	const setDisplaySettings = useSettingsStore(
		(state: settingsStoreType) => state.setDisplaySettings
	);

	const [isPublic, setIsPublic] = useState<boolean>(false);
	const [title, setTitle] = useState<string>(file.title);
	const [desc, setDesc] = useState<string>(file.desc || "");
	const [redirect, setRedirect] = useState<boolean>(false);

	useEffect(() => {
		setIsPublic(file.public);
	}, [file]);

	useEffect(() => {
		const deleteAndRedirect = async () => {
			const res = await deleteFile(id as string);
			setRedirect(res);
		};

		if (confirm.hasResponded) {
			if (confirm.response === true) {
				deleteAndRedirect();
			}
		}
	}, [confirm]);

	const confirmDeleteFile = () => {
		setConfirm("Are you sure you want to delete this file");
	};

	return (
		<div className="popup-blur-wrapper">
			{redirect && <Navigate to="/auth/profile" />}
			<div className="popup-container">
				<div className="popup-header">
					<h2 className="popup-title">Settings</h2>
					<span
						className="control-btns"
						onClick={() => setDisplaySettings(false)}
					>
						<FontAwesomeIcon icon={faXmark} />
					</span>
				</div>
				<div id="popup-body">
					<div className="settings-section">
						<div className="settings-section-inner">
							<div className="settings-body">
								<span>Visibility</span>
								<label className="switch" title="Make public">
									<input
										type="checkbox"
										checked={isPublic}
										onChange={() => changeVisibility(id as string, !isPublic)}
									/>
									<span className="slider round"></span>
								</label>
							</div>
						</div>
					</div>
					<div className="settings-section">
						<div className="settings-section-inner">
							<div className="settings-title">Change Title</div>
							<div className="settings-body">
								<input
									type="text"
									className="std-input"
									placeholder="Title"
									value={title}
									onChange={(e: any) => setTitle(e.target.value)}
								/>
								<button
									className="action-btn block settings-btn"
									onClick={() => changeTitle(id as string, title)}
								>
									Save
								</button>
							</div>
						</div>
					</div>
					<div className="settings-section">
						<div className="settings-section-inner">
							<div className="settings-title">Change Description</div>
							<div className="settings-body">
								<textarea
									className="std-input"
									placeholder="Enter Description"
									value={desc}
									onChange={(e: any) => setDesc(e.target.value)}
								/>
								<button
									className="action-btn block settings-btn"
									onClick={() => changeDesc(id as string, desc)}
								>
									Save
								</button>
							</div>
						</div>
					</div>
					<div className="settings-section">
						<div className="settings-section-inner">
							<div className="settings-title"></div>
							<div className="settings-body">
								<span>Delete this File</span>
								<button
									className="action-btn block settings-btn"
									onClick={confirmDeleteFile}
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
