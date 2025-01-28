import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { register_user } from "./component_functions/signup";

import "./authStyle.css";

const Signup = () => {
	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [redirect, setRedirect] = useState<boolean>(false);

	return (
		<div className="signup-container">
			{redirect && <Navigate to="/auth/profile" />}
			<h1>Register Here</h1>
			<label htmlFor="username">Username</label>
			<br />
			<input
				type="text"
				placeholder="username"
				name="username"
				value={username}
				onChange={(e: any) => setUsername(e.target.value)}
			/>
			<br />
			<label htmlFor="username">Email</label>
			<br />
			<input
				type="email"
				placeholder="email"
				name="email"
				value={email}
				onChange={(e: any) => setEmail(e.target.value)}
			/>
			<br />
			<label htmlFor="username">Password</label>
			<br />
			<input
				type="password"
				placeholder="password"
				name="password"
				value={password}
				onChange={(e: any) => setPassword(e.target.value)}
			/>
			<br />
			<button
				className="action-btn btn-dark"
				style={{ marginTop: "10px" }}
				onClick={() => register_user(username, email, password, setRedirect)}
			>
				Register
			</button>
			<br />
			<Link to="/auth/login">Already have an account? Login here</Link>
		</div>
	);
};

export default Signup;
