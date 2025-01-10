import {Expression, GraphingCalculator} from "desmos-react";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faCameraRetro } from '@fortawesome/free-solid-svg-icons';

import Controls from "./utils/Controls";

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
        plotterRef.current.updateSettings({ invertedColors: true })
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
        <div className="entity-top-bar">
            <div className="entitiy-title">
                Plotter
            </div>
            <Controls index={index} />
            <div className="entity-tools" style={{width: "60px"}}>
                <span className="control-btns" onClick={saveState}><FontAwesomeIcon icon={ faLock } /></span>
                <span className="control-btns" onClick={takeScreenShot}><FontAwesomeIcon icon={ faCameraRetro } /></span>
            </div>
        </div>
        <div className="entity-body">
            <GraphingCalculator attributes={{ className: "calculator" }} projectorMode ref={plotterRef}>
                <Expression id="fn" latex="x^2" />
            </GraphingCalculator>
        </div>
    </div>
  )
}


export default Plotter