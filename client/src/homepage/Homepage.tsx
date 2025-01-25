import { Link } from "react-router-dom";

import "./homepage.css";

import logo from "../assets/images/cloudslate-logo.png";

const Homepage = () => {
	return (
		<div id="homepage">
			<div id="hero">
				<div id="hero-left">
					<h1 style={{ margin: "0" }}>Welcome to</h1>
					<h1 id="hero-main-title">Cloudslate</h1>
					<p id="hero-desc">
						Designed to empower educators, teams, and creators. <br />
						Collaborate seamlessly, anytime and anywhere.
					</p>
					<Link to="/auth/register">
						<button className="primary-btn">Get Started</button>
					</Link>
				</div>
				<div id="hero-right">
					<img src={logo} alt="cloudslate-hero-img" id="hero-img" />
				</div>
			</div>
		</div>
	);
};

export default Homepage;
