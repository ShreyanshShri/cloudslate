import { login } from "../../../api_calls/userApiCalls";

export const login_user = async (
	email: string,
	password: string,
	setRedirect: Function
) => {
	const response = await login(email, password);
	if (response.status == 200) {
		localStorage.setItem("token", response.data.token);
		localStorage.setItem("user_id", response.data.user_id);
		setRedirect(true);
	}
};
