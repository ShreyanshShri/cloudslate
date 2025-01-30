const axios = require("../my_axios");

const BACKEND_URL = require("../backend_url");

const unauthorized_token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODllNmRmMTEwNTcxMGE5MjQ5OTIzZCIsImlhdCI6MTczNzExNTA1NX0.RjMn0SPyAmnQeVXz6h3y-JFqlRtptIOlFEc86nZ7-74";

describe("Authentication", () => {
	let user_id;
	let token;
	let file;

	beforeAll(async () => {
		const username = `shreyansh-${Math.random()}`;
		const email = `shreyansh-${Math.random()}@gmail.com`;
		const password = "test-pass";

		const response = await axios.post(`${BACKEND_URL}/api/v1/auth/register`, {
			username,
			password,
			email,
		});

		token = response.data.token;
		user_id = response.data.user_id;
		const res2 = await axios.post(
			`${BACKEND_URL}/api/v1/editor/new`,
			{},
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);
		expect(res2.data.file).toBeDefined();
		file = res2.data.file;
	});

	test("User is able to sign up only once", async () => {
		const username = "shreyansh" + Math.random();
		const email = "shreyansh" + Math.random() + "@gmail.com";
		const password = "test-pass";
		const response = await axios.post(`${BACKEND_URL}/api/v1/auth/register`, {
			username,
			password,
			email,
		});
		expect(response.status).toBe(200);

		const updatedResponse = await axios.post(
			`${BACKEND_URL}/api/v1/auth/register`,
			{
				username,
				password,
				email,
			}
		);
		expect(updatedResponse.status).toBe(400);
	});

	test("Signup request fails if the username is empty", async () => {
		// const username = `kirat-${Math.random()}`
		const password = "123456";

		const response = await axios.post(`${BACKEND_URL}/api/v1/auth/register`, {
			password,
		});
		expect(response.status).toBe(400);
	});

	test("Signin succeeds if the username and password are correct", async () => {
		const username = `shreyansh-${Math.random()}`;
		const email = `shreyansh-${Math.random()}@gmail.com`;
		const password = "test-pass";

		await axios.post(`${BACKEND_URL}/api/v1/auth/register`, {
			username,
			password,
			email,
		});

		const response = await axios.post(`${BACKEND_URL}/api/v1/auth/login`, {
			email,
			password,
		});

		expect(response.status).toBe(200);
		expect(response.data.token).toBeDefined();
	});

	test("Signin fails if the username and password are incorrect", async () => {
		const username = `shreyansh-${Math.random()}`;
		const email = `shreyansh-${Math.random()}@gmail.com`;
		const password = "test-pass";

		await axios.post(`${BACKEND_URL}/api/v1/auth/register`, {
			username,
			password,
			email,
		});

		const response = await axios.post(`${BACKEND_URL}/api/v1/auth/login`, {
			username: "WrongUsername",
			password,
		});

		expect(response.status).toBe(400);
	});

	test("User is able to bookmark a file", async () => {
		const response = await axios.post(
			`${BACKEND_URL}/api/v1/auth/add-bookmark?id=${file._id}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		expect(response.status).toBe(200);
	});

	test("User is able to see if a file is bookmarked.", async () => {
		const response = await axios.get(
			`${BACKEND_URL}/api/v1/auth/check-bookmark?id=${file._id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		expect(response.status).toBe(200);
		expect(response.data.status).toBe(true);
	});

	test("User is not able to re-bookmark a file", async () => {
		await axios.post(
			`${BACKEND_URL}/api/v1/auth/add-bookmark?id=${file._id}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const response = await axios.get(`${BACKEND_URL}/api/v1/auth/get`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		expect(response.data.user.bookmarks.length).toBe(1);
	});

	test("User is not able to bookmark a file with incorrect auth id", async () => {
		const response = await axios.post(
			`${BACKEND_URL}/api/v1/auth/add-bookmark?id=${file._id}`,
			{},
			{
				headers: {
					Authorization: `Bearer wrong id`,
				},
			}
		);
		expect(response.status).toBe(400);
	});

	test("User is not able to bookmark a file with incorrect file id", async () => {
		const response = await axios.post(
			`${BACKEND_URL}/api/v1/auth/add-bookmark?id=wrong_id`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		expect(response.status).toBe(400);
	});

	test("User is able to un-bookmark a file", async () => {
		const response = await axios.post(
			`${BACKEND_URL}/api/v1/auth/remove-bookmark?id=${file._id}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		expect(response.status).toBe(200);
	});

	test("User is not able to re-un-bookmark a file", async () => {
		await axios.post(
			`${BACKEND_URL}/api/v1/auth/remove-bookmark?id=${file._id}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const response = await axios.get(`${BACKEND_URL}/api/v1/auth/get`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		expect(response.data.user.bookmarks.length).toBe(0);
	});
});
