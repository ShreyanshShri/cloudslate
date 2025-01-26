import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./layout.css";
import useFileStore from "../../../stores/FileStore";
import useAlertStore from "../../../stores/AlertStore";

import TextEditor from "./entities/TextEditor";
import Plotter from "./entities/Plotter";
import Quiz from "./entities/Quiz";
import Whiteboard from "./entities/Whiteboard";

function MainBar() {
	const [redirect_url_id, setRedirect] = useState<string>("");
	// const [hasWriteAccess, setHasWriteAccess] = useState<boolean | null>(null);
	// const user_id = localStorage.getItem("user_id");
	// 		let has_access = false;
	// 		if (res_file.admin._id == user_id) {
	// 			has_access = true;
	// 		}
	// 		res_file.contributors.forEach((con: any) => {
	// 			if (con._id == user_id) has_access = true;
	// 		});
	// 		setHasWriteAccess(has_access);

	const file = useFileStore((state: any) => state.file);
	const setFile = useFileStore((state: any) => state.setFile);
	const setAlert = useAlertStore((store: any) => store.setAlert);
	const { id } = useParams();

	useEffect(() => {
		check_id_and_get_file();
	}, []);

	const check_id_and_get_file = async () => {
		if (id == undefined) {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_SERVER_URL}/editor/new`,
					{},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				);
				console.log(response.data);
				setFile(response.data.file);
				setRedirect(response.data.file._id);
			} catch (err: any) {
				setAlert("error", err.response.data.message);
				console.error(err.response.data);
			}
			return;
		}

		try {
			const response = await axios.get(
				`${import.meta.env.VITE_SERVER_URL}/editor/get?id=${id}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			console.log(response.data);
			const res_file = response.data.file;
			setFile(res_file);
		} catch (err: any) {
			setAlert("error", err.response.data.message);
			console.error(err.response.data);
		}
	};

	return (
		<div id="main-bar">
			{redirect_url_id !== "" && <Navigate to={`/editor/${redirect_url_id}`} />}
			{file.entities.map((en: any, index: number) => {
				if (en.type === "textarea") {
					return <TextEditor key={index} index={index} />;
				}
				if (en.type === "plotter") {
					return <Plotter key={index} index={index} />;
				}
				if (en.type === "quiz") {
					return <Quiz key={index} data={JSON.parse(en.data)} index={index} />;
				}
				if (en.type === "whiteboard") {
					return (
						<Whiteboard
							key={index}
							index={index}
							snapshot={JSON.parse(en.data)}
						/>
					);
				}
			})}
		</div>
	);
}

export default MainBar;
