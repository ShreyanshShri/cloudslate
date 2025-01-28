import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { login_user } from "./component_functions/login";

import "./authStyle.css";

const Login = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [redirect, setRedirect] = useState<boolean>(false);

	return (
		<div className="signup-container">
			{redirect && <Navigate to="/auth/profile" />}
			<h1>Login Here</h1>
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
				onClick={() => login_user(email, password, setRedirect)}
			>
				Login
			</button>
			<br />
			<Link to="/auth/register">Dont have an account? Register here</Link>
		</div>
	);
};

export default Login;
