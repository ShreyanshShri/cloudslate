import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSubtract } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import "./widgets.css";

type Props = {
	Child?: any;
	title: string;
	opened: boolean;
};

const WidgetWrapper = ({ Child, title, opened }: Props) => {
	const [isCollapsed, setIsCollapsed] = useState<boolean>(!opened);

	return (
		<div className="widget-wrapper">
			<div className="widget-wrapper-header">
				<span>{title}</span>
				<div
					onClick={() => setIsCollapsed((prev) => !prev)}
					className="collapse-btn"
				>
					<FontAwesomeIcon icon={isCollapsed ? faPlus : faSubtract} />
				</div>
			</div>
			<div
				style={{
					lineHeight: isCollapsed ? "0" : "",
					height: isCollapsed ? "0" : "100%",
				}}
				className="collapsable widget-body"
			>
				<Child />
			</div>
		</div>
	);
};

export default WidgetWrapper;
