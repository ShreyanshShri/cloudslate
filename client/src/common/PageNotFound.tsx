import { Link } from "react-router-dom";

import "./common_styles.css";

const PageNotFound = () => {
	return (
		<div id="page-not-found">
			<h1 id="error">404</h1>
			<div id="page">Ooops!!! The page you are looking for is not found</div>
			<Link className="primary-btn" to="/">
				Back to home
			</Link>
		</div>
	);
};

export default PageNotFound;
