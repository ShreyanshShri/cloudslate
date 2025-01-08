import "./layout.css";

import Calculator from "./widgets/Calculator";
import WidgetWrapper from "./widgets/WidgetWrapper";
import ItemSelector from "./widgets/ItemSelector";

function LeftBar() {
    return (
        <div id="left-bar">
            <WidgetWrapper Child={Calculator} title="Calculator" />
            <WidgetWrapper Child={ItemSelector} title="Items Picker" />
        </div>
    )
}

export default LeftBar;