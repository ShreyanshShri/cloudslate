import "./layout.css";

import WidgetWrapper from "./widgets/WidgetWrapper";
import MembersList from "./widgets/MembersList";

function RightBar() {
    return (
        <div id="right-bar">
            <WidgetWrapper Child={MembersList} title="Members List" opened={true} />
        </div>
    )
}

export default RightBar;