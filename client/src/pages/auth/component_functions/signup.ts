import { register } from "../../../api_calls/userApiCalls";

export const register_user = async (
	username: string,
	email: string,
	password: string,
	setRedirect: Function
) => {
	const response = await register(username, email, password);
	if (response.status == 200) {
		localStorage.setItem("token", response.data.token);
		localStorage.setItem("user_id", response.data.user_id);
		setRedirect(true);
	}
};
