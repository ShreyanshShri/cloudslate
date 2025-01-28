import useFileStore from "../../../../stores/FileStore";
import Tesseract from "tesseract.js";

const setTextareaText = useFileStore.getState().setTextareaText;

const handleMicChange = (listening: boolean, SpeechRecognition: any) => {
	if (!listening) {
		SpeechRecognition.startListening({ continuous: true });
	} else {
		SpeechRecognition.stopListening();
	}
};

const handleInputChange = (event: any, setImage: any) => {
	setImage(URL.createObjectURL(event.target.files[0]));
};

const convertToText = (image: any, index: number) => {
	// const canvas = canvasRef.current;
	// const ctx = canvas?.getContext('2d');

	// ctx?.drawImage(imageRef.current, 0, 0);
	// ctx?.putImageData(preprocessImage(canvas),0,0);
	// const dataUrl = canvas?.toDataURL("image/jpeg");

	recognizeText(image, index);
};

const recognizeText = async (dataUrl: any, index: number) => {
	try {
		const result: any = await Tesseract.recognize(dataUrl, "eng", {
			logger: (m) => console.log(m),
		});
		let text: any = result?.data.text;

		setTextareaText(index, text);
		console.log(result);
	} catch (error) {
		console.log(error);
		// alert("An error ocuured while reading img")
	}
};

export { handleMicChange, convertToText, handleInputChange };
