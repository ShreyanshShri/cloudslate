import "./layout.css";
import useEntityStore from "../stores/EntityStore";

import TextEditor from "./entities/TextEditor";
import Plotter from "./entities/Plotter";
import Quiz from "./entities/Quiz";

function MainBar() {
    const entities = useEntityStore((state: any) => state.entities);

    return (
        <div id="main-bar">
            {entities.map((en: any, index: number) => {
                if(en.type === "textarea") {
                    return (<TextEditor key={index} index={index} />);
                }
                if(en.type === "plotter") {
                    return (<Plotter key={index} index={index} />);
                }
                if(en.type === "quiz") {
                    return (<Quiz key={index} data={en.data} index={index} />)
                }
            })}
        </div>
    )
}

export default MainBar;