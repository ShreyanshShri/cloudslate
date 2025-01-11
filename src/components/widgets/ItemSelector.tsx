import useEntityStore from "../../stores/EntityStore";

import "./widgets.css";

const ItemSelector = () => {
    const pushTextEditor = useEntityStore((state :any) => state.pushTextEditor);
    const pushPlotter = useEntityStore((state :any) => state.pushPlotter);
    const pushWhiteboard = useEntityStore((state: any) => state.pushWhiteboard);
    const setDisplayQuizMaker = useEntityStore((state: any) => state.setDisplayQuizMaker);
  return (
    <div>
        <ul id="picker-list">
            <li onClick={() => pushTextEditor("initial text")}><span>text Editor</span><span>+</span></li>
            <li onClick={() => pushPlotter()}><span>Plotter</span><span>+</span></li>
            <li onClick={() => pushWhiteboard(null)}><span>Whiteboard</span><span>+</span></li>
            <li onClick={() => setDisplayQuizMaker(true)}><span>Quiz</span><span>+</span></li>
        </ul>
    </div>
  )
}

export default ItemSelector