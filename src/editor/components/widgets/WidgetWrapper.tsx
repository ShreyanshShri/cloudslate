// import { ComponentType } from "react"
import { useState } from "react";

import "./widgets.css";

type Props = {
    Child? : any,
    title: string,
    opened: boolean;
  }

const WidgetWrapper = ({Child, title, opened} : Props) => {

    const [isCollapsed, setIsCollapsed] = useState<boolean>(!opened);

  return (
    <div className='widget-wrapper'>
        <div className="widget-wrapper-header">
            <span>{title}</span>
            <button 
                onClick={() => setIsCollapsed(prev => !prev)}
                className="collapse-btn">
            {isCollapsed ? "+" : "-"}</button>
        </div>
        <div style={{
                lineHeight: isCollapsed ? "0" : "",
                height: isCollapsed ? "0" : "100%",
            }} 
            className="collapsable widget-body">
            <Child />
        </div>
    </div>
  )
}

export default WidgetWrapper