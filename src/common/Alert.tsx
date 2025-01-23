import useAlertStore from "../stores/AlertStore"

import "./common_styles.css"

type props = {
    type: "error" | "warning" | "success" | null,
    message: string
}

const Alert = ({type, message}: props) => {

    const clearAlert = useAlertStore((state: any) => state.clearAlert)

  return (
    <div className="alert-wrapper">
        <div className="alert-box">
            <div className="alert-body">
                <div className="alert-type">{type}</div>
                <div className="alert-message">{message}</div>
            </div>
            <div className="alert-footer">
                <button className="btn-dark" onClick={clearAlert}>Close</button>
            </div>
        </div>
    </div>
  )
}

export default Alert