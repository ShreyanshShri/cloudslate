import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLock,
	faExpand,
	faCameraRetro,
} from "@fortawesome/free-solid-svg-icons";
import { Tldraw, useEditor, getSnapshot, exportToBlob } from "tldraw";
import "tldraw/tldraw.css";

import "./entities.css";
import Controls from "./utils/Controls";
import useFileStore from "../../../../stores/FileStore";

type props = {
	index: number;
	snapshot: any;
};

const Whiteboard = ({ index, snapshot }: props) => {
	const [save, setSave] = useState<boolean>(false);
	const [expand, setExpand] = useState<boolean>(false);
	const [downloadCanvas, setDownloadCanvas] = useState<boolean>(false);

	return (
		<div
			className={
				expand
					? "entity-wrapper mb-2 whiteboard-expanded"
					: "entity-wrapper mb-2"
			}
		>
			<div className="entity-top-bar">
				<div className="entity-title">Whiteboard</div>
				<Controls index={index} />
				<div className="entity-tools" style={{ width: "90px" }}>
					<span className="control-btns" onClick={() => setSave(true)}>
						<FontAwesomeIcon icon={faLock} />
					</span>
					<span
						className="control-btns"
						onClick={() => setDownloadCanvas(true)}
					>
						<FontAwesomeIcon icon={faCameraRetro} />
					</span>
					<span
						className="control-btns"
						onClick={() => setExpand((prev: any) => !prev)}
					>
						<FontAwesomeIcon icon={faExpand} />
					</span>
				</div>
			</div>
			<div
				className={
					expand
						? "entity-body whiteboard-body whiteboard-body-expanded"
						: "entity-body whiteboard-body"
				}
			>
				{snapshot ? (
					<Tldraw snapshot={snapshot} inferDarkMode>
						<SaveButton save={save} setSave={setSave} index={index} />
						{downloadCanvas && (
							<DownloadCanvas setDownloadCanvas={setDownloadCanvas} />
						)}
					</Tldraw>
				) : (
					<Tldraw inferDarkMode>
						<SaveButton save={save} setSave={setSave} index={index} />
						{downloadCanvas && (
							<DownloadCanvas setDownloadCanvas={setDownloadCanvas} />
						)}
					</Tldraw>
				)}
			</div>
		</div>
	);
};

function SaveButton({
	index,
	save,
	setSave,
}: {
	index: any;
	save: boolean;
	setSave: any;
}) {
	const editor = useEditor();
	const saveWhiteboard = useFileStore((state: any) => state.saveWhiteboard);
	useEffect(() => {
		if (save) {
			const { document, session } = getSnapshot(editor.store);
			saveWhiteboard(index, { document, session });
			setSave(false);
		}
	}, [save]);
	return null;
}

function DownloadCanvas({ setDownloadCanvas }: { setDownloadCanvas: any }) {
	const editor = useEditor();

	useEffect(() => {
		getImg();
	}, []);

	const getImg = async () => {
		setDownloadCanvas(true);
		const shapeIds = editor.getCurrentPageShapeIds();
		if (shapeIds.size === 0) return alert("No shapes on the canvas");
		const blob = await exportToBlob({
			editor,
			ids: [...shapeIds],
			format: "png",
			opts: { background: true },
		});
		const link = document.createElement("a");
		link.href = window.URL.createObjectURL(blob);
		link.download = "every-shape-on-the-canvas.jpg";
		link.click();
		link.remove();
	};

	return null;
}

export default Whiteboard;
