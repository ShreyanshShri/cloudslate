import { useState, useEffect } from "react";
import { useSpeechRecognition } from "react-speech-recognition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faMicrophone } from "@fortawesome/free-solid-svg-icons";

import {
	handleMicChange,
	convertToText,
	handleInputChange,
} from "../../component_functions/entities/textEditor";

import useFileStore from "../../../../stores/FileStore";

import Controls from "./utils/Controls";
// import preprocessImage from "../../utils/preprocess";

import "./entities.css";

type props = {
	index: number;
};

const TextEditor = ({ index }: props) => {
	const [image, setImage] = useState("");
	const [floater, setFloater] = useState<boolean>(false);

	const text = useFileStore((state: any) => state.file?.entities[index]?.data);
	const setTextareaText = useFileStore((state: any) => state.setTextareaText);

	const {
		transcript,
		listening,
		// resetTranscript,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition();

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesnt support speech recognition.</span>;
	}

	useEffect(() => {
		// setTextareaText(index, transcript);
	}, [transcript]);

	return (
		<div className="entity-wrapper mb-2">
			<div className="entity-top-bar">
				<div className="entity-title">Text Editor</div>
				<Controls index={index} />
				<div className="entity-tools" style={{ width: "60px" }}>
					<div className="clip-wrapper">
						<div
							className="floater"
							style={{ display: floater ? "block" : "none" }}
						>
							<input
								type="file"
								onChange={(e: any) => handleInputChange(e, setImage)}
							/>
							<button
								onClick={() => convertToText(image, index)}
								style={{ height: 50 }}
							>
								Convert to text
							</button>
						</div>
						<span
							className="control-btns"
							onClick={() => setFloater((prev) => !prev)}
						>
							<FontAwesomeIcon icon={faPaperclip} />
						</span>
					</div>
					{/* pin */}
					<div className="mic-wrapper">
						<span
							className="control-btns mic-btn"
							onClick={() => handleMicChange(listening, SpeechRecognition)}
						>
							<FontAwesomeIcon icon={faMicrophone} />
						</span>
					</div>
				</div>
			</div>
			<div className="entity-textarea-body">
				<textarea
					className="text-editor-textarea"
					name="postContent"
					value={text}
					onChange={(e) => setTextareaText(index, e.target.value)}
				/>
			</div>
		</div>
	);
};

export default TextEditor;
