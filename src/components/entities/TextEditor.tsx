import { useState, useEffect } from "react";
import Tesseract from 'tesseract.js';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import useEntityStore from "../../stores/EntityStore";
// import preprocessImage from "../../utils/preprocess";

import "./entities.css";

type props = {
    index: number
};  

const TextEditor = ({index}: props) => {
    const [image, setImage] = useState("");
    const [floater, setFloater] = useState<boolean>(false);
    // const canvasRef = useRef<any>(null);
    // const imageRef = useRef<any>(null);

    const setTextareaText = useEntityStore((state: any) => state.setTextareaText);
    const text = useEntityStore((state: any) => state.entities[index].text);

    const {
        transcript,
        listening,
        // resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();

      if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
      }

    const handleMicChange = () => {
        if(!listening) { SpeechRecognition.startListening({continuous: true}) }
        else { SpeechRecognition.stopListening() }
    }
    
    useEffect(() => {
        setTextareaText(index, transcript);
    }, [transcript])

    const handleChange = (event: any) => {
        setImage(URL.createObjectURL(event.target.files[0]))
    }
    
    const handleClick = () => {
        
        // const canvas = canvasRef.current;
        // const ctx = canvas?.getContext('2d');
    
        // ctx?.drawImage(imageRef.current, 0, 0);
        // ctx?.putImageData(preprocessImage(canvas),0,0);
        // const dataUrl = canvas?.toDataURL("image/jpeg");
    
        recognizeText(image);
    }

    const recognizeText = async (dataUrl : any)  => {
        try {
            const result: any = await Tesseract.recognize(
                            dataUrl,'eng',
                            { logger: m => console.log(m) }
                            );
            let text : any = result?.data.text

            setTextareaText(index, text);
            console.log(result);
        } catch (error) {
            console.log(error);
            // alert("An error ocuured while reading img")
        }
    }

  return (
    <div className="mb-2">
        <div className="text-editor-top-bar top-bar">
            <div className="entitiy-title">
                Text Editor
            </div>
            <div className="entity-tools">
                <div className="clip-wrapper">
                    <div className="floater" style={{display: floater ? "block" : "none"}}>
                        <input type="file" onChange={handleChange} />
                        <button onClick={handleClick} style={{height:50}}>Convert to text</button>
                    </div>
                    <button onClick={() => setFloater(prev => !prev)}>clip</button>
                </div>
                {/* pin */}
                <div className="mic-wrapper">
                    <button className="mic-btn" onClick={handleMicChange}>mic</button>
                </div>
            </div>
        </div>
        <div className="text-editor-body body">
            <textarea
            className="text-editor-textarea"
            name="postContent"
            value={text}
            onChange={e => setTextareaText(index, e.target.value)}
        />
        {/* <img 
           src={image} className="App-logo" alt="logo"
           ref={imageRef} 
           /> */}
        {/* <canvas ref={canvasRef} width={700} height={250}></canvas> */}
          {/* <h3>Extracted text</h3> */}

        </div>
    </div>
  )
}

export default TextEditor