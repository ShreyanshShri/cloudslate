import { useState } from "react";

import "./layout.css";

import Calculator from "./widgets/Calculator";
import WidgetWrapper from "./widgets/WidgetWrapper";
import ItemSelector from "./widgets/ItemSelector";

function LeftBar() {
	const [scrolling, setScrolling] = useState<boolean>(false);

	const showScroll = () => {
		setScrolling(true);
		setTimeout(() => {
			setScrolling(false);
		}, 1000);
	};

	return (
		<div
			id="left-bar"
			className={scrolling ? "scroll" : "scroll scroll-hide"}
			onScroll={showScroll}
		>
			<WidgetWrapper Child={ItemSelector} title="Items Picker" opened={true} />
			<WidgetWrapper Child={Calculator} title="Calculator" opened={false} />
		</div>
	);
}

export default LeftBar;
