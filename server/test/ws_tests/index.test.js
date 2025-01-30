const BACKEND_URL = require("../backend_url");
const axios = require("../my_axios");
const { io } = require("socket.io-client");

async function setupHTTP() {
	const random1 = Math.random();
	const random2 = Math.random();
	const username1 = `shreyansh-${random1}`;
	const email1 = `shreyansh-${random1}@gmail.com`;
	const password1 = "test-pass";
	const username2 = `shreyansh-${random2}`;
	const email2 = `shreyansh-${random2}@gmail.com`;
	const password2 = "test-pass";

	const response1 = await axios.post(`${BACKEND_URL}/api/v1/auth/register`, {
		username1,
		password1,
		email1,
	});

	const response2 = await axios.post(`${BACKEND_URL}/api/v1/auth/register`, {
		username2,
		password2,
		email2,
	});

	const user1 = {
		token: response1.data.token,
		username: username1,
		id: response1.data.user_id,
	};
	const user2 = {
		token: response2.data.token,
		username: username2,
		id: response2.data.user_id,
	};
}

async function setupWs(socket1, socket2) {
	const socket = io("http://localhost:3001/");
}

describe("Websocket test", () => {
	let socket1, socket2;
	let user1, user2;

	beforeAll(async () => {
		const { u1, u2 } = await setupHTTP();
		(user1 = u1), (user2 = u2);
		await setupWs();
	});
});
