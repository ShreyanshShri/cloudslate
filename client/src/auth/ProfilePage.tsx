import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

import { file_type } from "../types/fileTypes";

import useAlertStore, { alertStoreType } from "../stores/AlertStore";

import FileListCard from "./components/FileListCard";
import Loader from "../common/Loader";

import "./authStyle.css";

const ProfilePage = () => {
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [redirect, setRedirect] = useState<boolean>(false);
	const [deleteData, setDeleteData]: [any, any] = useState<object>({
		id: null,
		index: null,
	});

	const confirm = useAlertStore((state: alertStoreType) => state.confirm);
	const setAlert = useAlertStore((state: alertStoreType) => state.setAlert);
	const setConfirm = useAlertStore((state: alertStoreType) => state.setConfirm);
	const clearConfirm = useAlertStore(
		(state: alertStoreType) => state.clearConfirm
	);

	useEffect(() => {
		getUser();
	}, []);

	useEffect(() => {
		if (confirm.hasResponded) {
			if (confirm.response === true) {
				deleteFile();
			}
		}
	}, [confirm]);

	const getUser = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}/auth/get`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			setUser(response.data.user);
			setLoading(() => false);
			console.log(response.data);
		} catch (err: any) {
			console.error(err.response.data);
			setAlert(err.response.data.message, "error");
			setRedirect(true);
		}
	};

	const confirmDeleteFile = (id: string, index: number) => {
		setConfirm("Are you sure you want to delete this file");
		setDeleteData({
			id,
			index,
		});
	};

	const deleteFile = async () => {
		try {
			const response = await axios.delete(
				`${import.meta.env.VITE_SERVER_URL}/editor/delete?id=${deleteData.id}`,
				{
					data: {
						index: deleteData.index,
					},
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			clearConfirm();
			let filtered: file_type[] = [];
			for (let x = 0; x < user.files.length; x++) {
				if (x !== deleteData.index) filtered.push(user.files[x]);
			}
			setAlert(response.data.message, "success");
			setUser((prev: any) => ({ ...prev, files: filtered }));
			setDeleteData({
				id: null,
				index: null,
			});
		} catch (err: any) {
			console.error(err.response.data);
			clearConfirm();
			setDeleteData({
				id: null,
				index: null,
			});
			setAlert(err.response.data.message, "error");
		}
	};

	const logOut = () => {
		localStorage.setItem("token", "");
		localStorage.setItem("user_id", "");
		setRedirect(true);
	};

	return (
		<div id="profile-page">
			{redirect && <Navigate to="/" />}
			{loading ? (
				<Loader />
			) : (
				<div>
					<div id="personal-info">
						<div id="pi-left">
							<h1>{user.username}</h1>
							<p>{user.email}</p>
						</div>
						<div id="pi-right">
							<button className="action-btn btn-darker" onClick={logOut}>
								Log Out
							</button>
						</div>
					</div>
					<Link to="/editor/new">
						<button
							className="action-btn btn-dark"
							style={{ marginBottom: "10px" }}
						>
							New File
						</button>
					</Link>
					{user.files.map((file: file_type, index: number) => (
						<FileListCard
							key={index}
							index={index}
							id={file._id}
							title={file.title}
							createdAt={file.createdAt}
							confirmDeleteFile={confirmDeleteFile}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default ProfilePage;
