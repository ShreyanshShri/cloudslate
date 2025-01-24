import { useEffect, useState } from "react";
import { exportToBlob, Tldraw, useEditor } from "tldraw";
import "tldraw/tldraw.css";

type props = {
	index: number;
	data: string;
};

const ViewWhiteBoard = ({ data }: props) => {
	const [img, setImg] = useState<any>(null);
	const [canvas, setCanvas] = useState<any>(true);
	const parsedData: any = JSON.parse(data);

	return (
		<>
			{canvas && (
				<div style={{ width: "0", height: "0" }}>
					<Tldraw snapshot={parsedData}>
						<ExportCanvasComponent setImg={setImg} setCanvas={setCanvas} />
					</Tldraw>
				</div>
			)}
			{img && <img src={img} className="whiteboard-img" />}
		</>
	);
};

export default ViewWhiteBoard;

function ExportCanvasComponent({
	setImg,
	setCanvas,
}: {
	setImg: any;
	setCanvas: any;
}) {
	const editor = useEditor();

	useEffect(() => {
		getImg();
	}, []);

	const getImg = async () => {
		const shapeIds = editor.getCurrentPageShapeIds();
		if (shapeIds.size === 0) {
			setCanvas(false);
			return;
		}
		const blob = await exportToBlob({
			editor,
			ids: [...shapeIds],
			format: "png",
			opts: { background: true },
		});
		setImg(window.URL.createObjectURL(blob));
		setCanvas(false);
	};

	return <></>;
}
