import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faExpand } from "@fortawesome/free-solid-svg-icons";
import { Tldraw, useEditor, getSnapshot } from 'tldraw';
import 'tldraw/tldraw.css';

import "./entities.css";
import Controls from "./utils/Controls";
import useFileStore from "../../../stores/FileStore";

type props = {
    index: number,
    snapshot: any
};

const Whiteboard = ({index, snapshot}: props) => {
    const [save, setSave] = useState<boolean>(false);
    const [expand, setExpand] = useState<boolean>(false);

  return (
    <div className={expand ? "mb-2 whiteboard-expanded" : "mb-2"}>
        <div className="entity-top-bar">
            <div className="entitiy-title">
                Whiteboard
            </div>
            <Controls index={index} />
            <div className="entity-tools" style={{width: "60px"}}>
                <span className="control-btns" onClick={() => setSave(true)}><FontAwesomeIcon icon={ faLock } /></span>
                <span className="control-btns" onClick={() => setExpand((prev: any) => !prev)}><FontAwesomeIcon icon={ faExpand } /></span>
            </div>
        </div>
        <div className={expand ? "entity-body whiteboard-body whiteboard-body-expanded" : "entity-body whiteboard-body"}>
            {/* <Tldraw>
                <InsideOfContext />
            </Tldraw> */}
            {snapshot ?
                <Tldraw snapshot={snapshot}><SaveButton save={save} setSave={setSave} index={index} /></Tldraw> 
               : <Tldraw><SaveButton save={save} setSave={setSave} index={index} /></Tldraw>}
        </div>
    </div>
  )
}

function SaveButton({index, save, setSave} : {index: any, save: boolean, setSave: any}) {
	const editor = useEditor()
    const saveWhiteboard = useFileStore((state: any) => state.saveWhiteboard);

    useEffect(() => {
        // const interval = setInterval(() => {
            // const { document, session } = getSnapshot(editor.store)
            // console.log(document, session)
            // saveWhiteboard(index, {document, session});
            // }, 5000);    
        if(save) {
            const { document, session } = getSnapshot(editor.store)
            saveWhiteboard(index, {document, session});
            setSave(false);
        }

        return () => {
            // clearInterval(interval);
        }
    }, [save]);
    // editor.store.listen(
    //     () => {
    //     },
    //     { scope: 'document', source: 'user' }
    // )
	return null;
}



// function InsideOfContext() {
//     const editor = useEditor();
//     console.log(editor.store);
//     return null;
// }

export default Whiteboard