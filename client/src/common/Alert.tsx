import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTriangleExclamation,
	faCircleXmark,
	faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

import useAlertStore from "../stores/AlertStore";

import "./common_styles.css";

type props = {
	type: "error" | "warning" | "success" | null;
	message: string;
};

const Alert = ({ type, message }: props) => {
	const clearAlert = useAlertStore((state: any) => state.clearAlert);
	console.log(type);
	return (
		<div className="alert-wrapper">
			<div className="alert-box">
				<div className="alert-body">
					<div className="alert-type">
						<FontAwesomeIcon
							icon={
								type == "success"
									? faCircleCheck
									: type == "error"
									? faCircleXmark
									: faTriangleExclamation
							}
							style={{
								color:
									type == "success"
										? "green"
										: type == "error"
										? "red"
										: "yellow",
							}}
						/>
					</div>
					<div className="alert-message">{message}</div>
				</div>
				<div className="alert-footer">
					<button
						className="action-btn btn-dark"
						onClick={clearAlert}
						autoFocus
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default Alert;
