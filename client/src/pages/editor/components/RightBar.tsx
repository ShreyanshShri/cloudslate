import { useState } from "react";
import "./layout.css";

import WidgetWrapper from "./widgets/WidgetWrapper";
import MembersList from "./widgets/MembersList";
import Chatbox from "./widgets/Chatbox";

function RightBar() {
	const [scrolling, setScrolling] = useState<boolean>(false);

	const showScroll = () => {
		setScrolling(true);
		setTimeout(() => {
			setScrolling(false);
		}, 1000);
	};

	return (
		<div
			id="right-bar"
			className={scrolling ? "scroll" : "scroll scroll-hide"}
			onScroll={showScroll}
		>
			<WidgetWrapper Child={MembersList} title="Members List" opened={true} />
			<WidgetWrapper Child={Chatbox} title="Chat" opened={true} />
		</div>
	);
}

export default RightBar;
