import "./layout.css";

import Calculator from "./widgets/Calculator";
import WidgetWrapper from "./widgets/WidgetWrapper";
import ItemSelector from "./widgets/ItemSelector";

function LeftBar() {
    return (
        <div id="left-bar">
            <WidgetWrapper Child={ItemSelector} title="Items Picker" opened={true} />
            <WidgetWrapper Child={Calculator} title="Calculator" opened={false} />
        </div>
    )
}

export default LeftBar;