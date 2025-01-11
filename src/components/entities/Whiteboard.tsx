import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faExpand } from "@fortawesome/free-solid-svg-icons";
import { Tldraw, useEditor, getSnapshot } from 'tldraw';
import 'tldraw/tldraw.css';

import "./entities.css";
import Controls from "./utils/Controls";
import useEntityStore from "../../stores/EntityStore";

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
                <span className="control-btns" onClick={() => setSave((prev: any) => !prev)}><FontAwesomeIcon icon={ faLock } /></span>
                <span className="control-btns" onClick={() => setExpand((prev: any) => !prev)}><FontAwesomeIcon icon={ faExpand } /></span>
            </div>
        </div>
        <div className={expand ? "entity-body whiteboard-body whiteboard-body-expanded" : "entity-body whiteboard-body"}>
            {/* <Tldraw>
                <InsideOfContext />
            </Tldraw> */}
            {snapshot ?
                <Tldraw snapshot={snapshot}><SaveButton save={save} index={index} /></Tldraw> 
               : <Tldraw><SaveButton save={save} index={index} /></Tldraw>}
        </div>
    </div>
  )
}

function SaveButton({index, save} : {index: any, save: boolean}) {
	const editor = useEditor()
    const saveWhiteboard = useEntityStore((state: any) => state.saveWhiteboard);

    useEffect(() => {
        // const interval = setInterval(() => {
            // const { document, session } = getSnapshot(editor.store)
            // console.log(document, session)
            // saveWhiteboard(index, {document, session});
            // }, 5000);    
        const { document, session } = getSnapshot(editor.store)
        saveWhiteboard(index, {document, session});

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