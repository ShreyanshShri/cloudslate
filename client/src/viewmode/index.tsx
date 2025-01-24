import { useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import generatePDF, { Resolution, Margin } from "react-to-pdf";

import { entity_type } from "../types/fileTypes";

import useFileStore from "../stores/FileStore";
import useAlertStore from "../stores/AlertStore";

import Loader from "../common/Loader";
import ViewTextarea from "./components/ViewTextarea";
import ViewPlotter from "./components/ViewPlotter";
import ViewQuiz from "./components/ViewQuiz";
import ViewWhiteBoard from "./components/ViewWhiteBoard";

import "./viewmode-styles.css";

const options: any = {
	// default is `save`
	method: "open",
	// HIGH< LOW or any number
	resolution: Resolution.MEDIUM,
	page: {
		// margin is in MM, default is Margin.NONE = 0
		margin: Margin.SMALL,
		// or letter
		format: "A4",
		// or landscape
		orientation: "portrait",
	},
	canvas: {
		// or png
		mimeType: "image/jpeg",
		qualityRatio: 1,
	},
	// Customize any value passed to the jsPDF instance and html2canvas
	// function. You probably will not need this and things can break,
	// so use with caution.
	overrides: {
		// see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
		pdf: {
			compress: true,
		},
		// see https://html2canvas.hertzen.com/configuration for more options
		canvas: {
			useCORS: true,
		},
	},
};

const ViewPage = () => {
	const file = useFileStore((state: any) => state.file);
	const setFile = useFileStore((state: any) => state.setFile);
	const setAlert = useAlertStore((state: any) => state.setAlert);
	const { id } = useParams();
	const pageRef = useRef<any>(null);

	useEffect(() => {
		if (file._id === null || file._id === undefined) {
			fetchFileData();
		}
	}, []);

	const fetchFileData = async () => {
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
			setFile(response.data.file);
		} catch (err: any) {
			setAlert(err.response.data.message, "error");
			console.error(err.response.data);
		}
	};

	const convertToPdf = async () => {
		const btn = document.getElementById("pdf-btn");
		const title = document.getElementById("view-title");
		Array.from(
			document.getElementsByClassName(
				"view-textarea"
			) as HTMLCollectionOf<HTMLElement>
		).forEach((x) => {
			x.style.color = "black";
		});
		if (btn) {
			btn.style.display = "none";
		}
		if (title) {
			title.style.color = "black";
		}
		await generatePDF(pageRef, options);
		Array.from(
			document.getElementsByClassName(
				"view-textarea"
			) as HTMLCollectionOf<HTMLElement>
		).forEach((x) => {
			x.style.color = "white";
		});
		if (btn) {
			btn.style.display = "inline";
		}
		if (title) {
			title.style.color = "white";
		}
	};

	return (
		<div id="view-page" ref={pageRef}>
			<div className="view-top">
				<h1 id="view-title">{file.title}</h1>
				<button
					className="btn btn-darker"
					id="pdf-btn"
					style={{ cursor: "pointer" }}
					onClick={convertToPdf}
				>
					Convert to PDF
				</button>
			</div>
			{file._id ? (
				file.entities.map((entity: entity_type, index: number) => {
					switch (entity.type) {
						case "textarea":
							return (
								<ViewTextarea key={index} index={index} data={entity.data} />
							);
						case "plotter":
							return (
								<ViewPlotter key={index} index={index} data={entity.data} />
							);
						case "quiz":
							return <ViewQuiz key={index} index={index} data={entity.data} />;
						case "whiteboard":
							return (
								<ViewWhiteBoard key={index} index={index} data={entity.data} />
							);
					}
				})
			) : (
				<Loader />
			)}
		</div>
	);
};

export default ViewPage;
