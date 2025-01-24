import { GraphingCalculator } from "desmos-react";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";

import Controls from "./utils/Controls";

import throttleFunction from "../../../utils/throttle_func";

import useFileStore from "../../../stores/FileStore";

import "./desmos.css";

type props = {
	index: number;
};

const Plotter = ({ index }: props) => {
	const plotterRef: any = useRef<any>(null);

	const plotterData = useFileStore((state: any) => state.file.entities[index]);
	const setPlotterData = useFileStore((state: any) => state.setPlotterData);

	useEffect(() => {
		console.log(plotterRef.current.settings);
		if (plotterData.data !== "") {
			plotterRef.current.setState(JSON.parse(plotterData.data));
		}
		plotterRef.current.updateSettings({
			invertedColors: true,
			autosize: false,
		});

		plotterRef.current.observeEvent("change", throttleFunction(saveState, 100));
		// const c = setInterval(() => {
		// 	const defaultSize: HTMLElement | null = document.querySelector(
		// 		'[aria-label="Display size: default"]'
		// 	);
		// 	const largeSize: HTMLElement | null = document.querySelector(
		// 		'[aria-label="Display size: large"]'
		// 	);

		// 	defaultSize?.setAttribute("aria-pressed", "true");
		// 	largeSize?.setAttribute("aria-pressed", "false");
		// 	console.log(defaultSize);
		// 	console.log(largeSize);
		// }, 4000);
		// return () => clearInterval(c);
	}, []);

	const saveState = () => {
		const state = plotterRef.current.getState();
		setPlotterData(index, JSON.stringify(state));
	};

	const takeScreenShot = () => {
		plotterRef.current.asyncScreenshot((data: any) => {
			var a = document.createElement("a");
			a.href = data;
			a.download = "Image.png";
			a.click();
			a.remove();
		});
	};

	return (
		<div className="entity-wrapper mb-2">
			<div className="entity-top-bar">
				<div className="entitiy-title">Plotter</div>
				<Controls index={index} />
				<div className="entity-tools" style={{ width: "30px" }}>
					<span className="control-btns" onClick={takeScreenShot}>
						<FontAwesomeIcon icon={faCameraRetro} />
					</span>
				</div>
			</div>
			<div className="entity-body">
				<GraphingCalculator
					attributes={{ className: "calculator" }}
					projectorMode
					ref={plotterRef}
				></GraphingCalculator>
			</div>
		</div>
	);
};

export default Plotter;
