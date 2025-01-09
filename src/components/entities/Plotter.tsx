import {Expression, GraphingCalculator} from "desmos-react";
import { useEffect, useRef } from "react";

import useEntityStore from "../../stores/EntityStore";

type props = {
    index: number
};  

const Plotter = ({index} : props) => {
    const plotterRef: any = useRef<any>(null);

    const plotterData = useEntityStore((state: any) => state.entities[index]);
    const setPlotterData = useEntityStore((state: any) => state.setPlotterData);

    useEffect(() => {
        if(plotterData.data !== "") { plotterRef.current.setState(JSON.parse(plotterData.data)); }
        // plotterRef.current.updateSettings({ invertedColors: true })
        console.log(plotterRef.current)
    }, []);

    const saveState = () => {
        const state = plotterRef.current.getState()
        setPlotterData(index, JSON.stringify(state));
    }

    const takeScreenShot = () => {
        plotterRef.current.asyncScreenshot((data: any) => {
            var a = document.createElement("a");
            a.href = data;
            a.download = "Image.png";
            a.click(); 
            a.remove();
        });
    }

    return (
    <div className="mb-2">
        <div className="text-editor-top-bar top-bar">
            <div className="entitiy-title">
                Plotter
            </div>
            <div className="entity-tools">
                <button onClick={saveState}>Lock</button>
                <button onClick={takeScreenShot}>Screenshot</button>
            </div>
        </div>
        <div className="text-editor-body body">
            <GraphingCalculator attributes={{ className: "calculator" }} projectorMode ref={plotterRef}>
                <Expression id="fn" latex="x^2" />
            </GraphingCalculator>
        </div>
    </div>
  )
}


export default Plotter