import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import useUserStore, { UserStoreTypes } from "../../stores/UserStore";

import FileList from "./components/FileList";
import BookmarkedList from "./components/BookmarkedList";
import Loader from "../common/Loader";

import {
	confirmDeleteFile,
	getUserAndUpdateUI,
	logOut,
} from "./component_functions/profilePage";

import "./authStyle.css";

const ProfilePage = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [redirect, setRedirect] = useState<boolean>(false);
	const [listType, setListType] = useState<"files" | "bookmarks">("files");

	const user = useUserStore((state: UserStoreTypes) => state.user);

	useEffect(() => {
		getUserAndUpdateUI(setRedirect, setLoading);
	}, []);

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
							<button
								className="action-btn btn-darker"
								onClick={() => logOut(setRedirect)}
							>
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
						<FileList confirmDeleteFile={confirmDeleteFile} />
					) : (
						<BookmarkedList />
					)}
				</div>
			)}
		</div>
	);
};

export default ProfilePage;
