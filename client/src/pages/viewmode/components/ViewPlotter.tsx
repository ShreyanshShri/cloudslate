import { GraphingCalculator } from "desmos-react";
import { useRef, useEffect, useState } from "react";

import "../viewmode-styles.css";

type props = {
	data: string;
	index: number;
};

const ViewPlotter = ({ data }: props) => {
	const [plottedImg, setPlottedImg] = useState<any>(null);
	const plotterRef: any = useRef<any>(null);

	useEffect(() => {
		if (data !== "") {
			plotterRef.current.setState(JSON.parse(data));
		}

		takeScreenShot();
	}, []);

	const takeScreenShot = () => {
		plotterRef.current.asyncScreenshot((d: any) => {
			setPlottedImg(d);
		});
	};

	return (
		<div id="ViewPlotter">
			{plottedImg === null && (
				<div className="calculator-wrapper">
					<GraphingCalculator
						attributes={{ className: "calculator" }}
						projectorMode
						ref={plotterRef}
					/>
				</div>
			)}
			<img src={plottedImg} className="graph-img" />
		</div>
	);
};

export default ViewPlotter;
