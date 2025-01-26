import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import { alertStoreType } from "../../stores/AlertStore";

import useAlertStore from "../../stores/AlertStore";

import "./common_styles.css";

type props = {
	message: string;
};

const Confirm = ({ message }: props) => {
	const setResponse = useAlertStore(
		(state: alertStoreType) => state.setResponse
	);

	const respond = (res: boolean) => {
		setResponse(res);
	};

	return (
		<div className="alert-wrapper">
			<div className="alert-box">
				<div className="alert-body">
					<div className="alert-type">
						<FontAwesomeIcon
							icon={faTriangleExclamation}
							style={{
								color: "yellow",
							}}
						/>
					</div>
					<div className="alert-message">{message}</div>
				</div>
				<div className="alert-footer">
					<button className="action-btn btn-dark" onClick={() => respond(true)}>
						Yes
					</button>
					<button
						className="action-btn btn-dark"
						style={{ marginLeft: "10px" }}
						onClick={() => respond(false)}
					>
						No
					</button>
				</div>
			</div>
		</div>
	);
};

export default Confirm;
