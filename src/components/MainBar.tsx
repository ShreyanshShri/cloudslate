import "./layout.css";
import useEntityStore from "../stores/EntityStore";

import TextEditor from "./entities/TextEditor";
import Plotter from "./entities/Plotter";

function MainBar() {
    const entities = useEntityStore((state: any) => state.entities);

    return (
        <div id="main-bar">
            {entities.map((en: any, key: number) => {
                if(en.type === "textarea") {
                    return (<TextEditor key={key} index={key} />);
                }
                if(en.type === "plotter") {
                    return (<Plotter key={key} index={key} />);
                }
            })}
        </div>
    )
}

export default MainBar;