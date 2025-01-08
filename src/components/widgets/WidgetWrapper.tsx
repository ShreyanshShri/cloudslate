// import { ComponentType } from "react"
import { useState } from "react";

import "./widgets.css";

type Props = {
    Child? : any,
    title: string,
  }

const WidgetWrapper = ({Child, title} : Props) => {

    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

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
                padding: isCollapsed ? "0px 20px" : "10px 20px",

            }} 
            className="collapsable widget-body">
            <Child />
        </div>
    </div>
  )
}

export default WidgetWrapper