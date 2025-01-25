import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

import useAlertStore from "../stores/AlertStore";

import "./authStyle.css";

const Login = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [redirect, setRedirect] = useState<boolean>(false);

	const setAlert = useAlertStore((state: any) => state.setAlert);
	// const clearAlert = useAlertStore((state: any) => state.clearAlert);

	const login = async () => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_SERVER_URL}/auth/login`,
				{
					email,
					password,
				}
			);
			localStorage.setItem("token", response.data.token);
			localStorage.setItem("user_id", response.data.user_id);
			setRedirect(true);
		} catch (err: any) {
			console.log(err.response.data);
			setAlert(err.response.data.message, "error");
		}
	};

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
				onClick={login}
			>
				Login
			</button>
			<br />
			<Link to="/auth/register">Dont have an account? Register here</Link>
		</div>
	);
};

export default Login;
