import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import { file_type } from "../../types/fileTypes";

import useAlertStore, { alertStoreType } from "../../stores/AlertStore";

import FileList from "./components/FileList";
import BookmarkedList from "./components/BookmarkedList";
import Loader from "../common/Loader";

import { deleteFile } from "../../utils/fileApiCalls";
import { getUser, addRemoveBookmark } from "../../utils/userApiCalls";

import "./authStyle.css";

const ProfilePage = () => {
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [redirect, setRedirect] = useState<boolean>(false);
	const [deleteData, setDeleteData]: [any, any] = useState<object>({
		id: null,
		index: null,
	});
	const [listType, setListType] = useState<"files" | "bookmarks">("files");

	const confirm = useAlertStore((state: alertStoreType) => state.confirm);
	const setConfirm = useAlertStore((state: alertStoreType) => state.setConfirm);

	useEffect(() => {
		getUserAndUpdateUI();
	}, []);

	useEffect(() => {
		removeDeletedFile(confirm);
	}, [confirm]);

	const confirmDeleteFile = (id: string, index: number) => {
		setConfirm("Are you sure you want to delete this file");
		setDeleteData({
			id,
			index,
		});
	};

	const removeDeletedFile = async (confirm: any) => {
		if (confirm.hasResponded) {
			if (confirm.response === true) {
				const res = await deleteFile(deleteData.id as string);
				if (res == true) {
					let filtered: file_type[] = [];
					for (let x = 0; x < user.files.length; x++) {
						if (x !== deleteData.index) filtered.push(user.files[x]);
					}
					setUser((prev: any) => ({ ...prev, files: filtered }));
					setDeleteData({
						id: null,
						index: null,
					});
				} else {
					setDeleteData({
						id: null,
						index: null,
					});
				}
			}
		}
	};

	const getUserAndUpdateUI = async () => {
		const res = await getUser();
		if (res.error == true) {
			setRedirect(true);
		} else {
			setUser(res);
			setLoading(() => false);
		}
	};

	const unBookmark = async (file_id: string, index: number) => {
		console.log("unbookmarking");
		const res = await addRemoveBookmark(file_id, "remove");
		console.log(res);
		if (!res) {
			let filtered: file_type[] = [];
			for (let x = 0; x < user.bookmarks.length; x++) {
				if (x !== index) filtered.push(user.bookmarks[x]);
			}
			console.log(filtered);
			setUser((prev: any) => ({ ...prev, bookmarks: filtered }));
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
					<div id="profile-toggle">
						<div
							className="profile-toggle-btn"
							id={listType === "files" ? "active" : ""}
							onClick={() => setListType("files")}
						>
							My Files
						</div>
						<div
							className="profile-toggle-btn"
							id={listType === "bookmarks" ? "active" : ""}
							onClick={() => setListType("bookmarks")}
						>
							Bookmarks
						</div>
					</div>
					{listType == "files" ? (
						<FileList confirmDeleteFile={confirmDeleteFile} user={user} />
					) : (
						<BookmarkedList unBookmark={unBookmark} user={user} />
					)}
				</div>
			)}
		</div>
	);
};

export default ProfilePage;
