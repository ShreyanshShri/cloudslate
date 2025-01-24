const axios = require("../my_axios");

const BACKEND_URL = require("../backend_url");

const unauthorized_token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODllNmRmMTEwNTcxMGE5MjQ5OTIzZCIsImlhdCI6MTczNzExNTA1NX0.RjMn0SPyAmnQeVXz6h3y-JFqlRtptIOlFEc86nZ7-74";

describe("Editor", () => {
	let token;
	let file;

	beforeAll(async () => {
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

		token = response.data.token;

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

	test("User is able to create a new file", async () => {
		const response = await axios.post(
			`${BACKEND_URL}/api/v1/editor/new`,
			{
				title: "My File",
			},
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);
		expect(response.status).toBe(200);
		expect(response.data.file).toBeDefined();
	});

	test("User is not able to create a new file with invalid token", async () => {
		const response = await axios.post(
			`${BACKEND_URL}/api/v1/editor/new`,
			{
				title: "My File",
			},
			{
				headers: {
					authorization: `Bearer invalid_token`,
				},
			}
		);

		expect(response.status).toBe(400);
	});

	test("Admin is able to get private file", async () => {
		const response = await axios.get(
			`${BACKEND_URL}/api/v1/editor/get?id=${file._id}`,
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);

		expect(response.status).toBe(200);
		expect(response.data.file).toBeDefined();
	});

	test("Non Authorized user is not able to get private file", async () => {
		const response = await axios.get(
			`${BACKEND_URL}/api/v1/editor/get?id=${file._id}`,
			{},
			{
				headers: {
					authorization: `Bearer ${unauthorized_token}`,
				},
			}
		);

		expect(response.status).toBe(400);
	});

	test("Authorized user is able to change the visibility", async () => {
		const response = await axios.put(
			`${BACKEND_URL}/api/v1/editor/edit/set-visibility?id=${file._id}`,
			{
				isPublic: true,
			},
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);

		expect(response.status).toBe(200);
		expect(response.data.public).toBe(true);
	});

	test("Unauthorized user is not able to change the visibility", async () => {
		const response = await axios.put(
			`${BACKEND_URL}/api/v1/editor/edit/set-visibility?id=${file._id}`,
			{
				isPublic: false,
			},
			{
				headers: {
					authorization: `Bearer ${unauthorized_token}`,
				},
			}
		);

		expect(response.status).toBe(400);
	});

	test("Unauthorized user is able to view public files", async () => {
		const response = await axios.get(
			`${BACKEND_URL}/api/v1/editor/get?id=${file._id}`,
			{
				headers: {
					authorization: `Bearer ${unauthorized_token}`,
				},
			}
		);

		expect(response.status).toBe(200);
		expect(response.data.file).toBeDefined();
	});

	test("Random user is able to view public files", async () => {
		const response = await axios.get(
			`${BACKEND_URL}/api/v1/editor/get?id=${file._id}`,
			{
				headers: {
					authorization: `Bearer invalid_token`,
				},
			}
		);

		expect(response.status).toBe(200);
		expect(response.data.file).toBeDefined();
	});

	test("Authorized user is able to push an entity", async () => {
		const response = await axios.put(
			`${BACKEND_URL}/api/v1/editor/edit/push?id=${file._id}`,
			{
				type: "textarea",
				data: "This is textarea data",
			},
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);

		expect(response.status).toBe(200);
		expect(response.data.entity).toBeDefined();
	});

	test("Unauthorized user is not able to push an entity", async () => {
		const response = await axios.put(
			`${BACKEND_URL}/api/v1/editor/edit/push?id=${file._id}`,
			{
				type: "textarea",
				data: "This is textarea data",
			},
			{
				headers: {
					authorization: `Bearer ${unauthorized_token}`,
				},
			}
		);

		expect(response.status).toBe(400);
	});

	test("Random user is not able to push an entity", async () => {
		const response = await axios.put(
			`${BACKEND_URL}/api/v1/editor/edit/push?id=${file._id}`,
			{
				type: "textarea",
				data: "This is textarea data",
			},
			{
				headers: {
					authorization: `Bearer invalid_token`,
				},
			}
		);

		expect(response.status).toBe(400);
	});

	test("Authorized user is able to edit an entity", async () => {
		const response = await axios.put(
			`${BACKEND_URL}/api/v1/editor/edit/entity-at-index?id=${file._id}`,
			{
				type: "textarea",
				index: 0,
				data: "This is modified data",
			},
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);

		expect(response.status).toBe(200);
		expect(response.data.entity).toBeDefined();
	});

	test("Cannot edit an entity with mismatch types", async () => {
		const response = await axios.put(
			`${BACKEND_URL}/api/v1/editor/edit/entity-at-index?id=${file._id}`,
			{
				type: "plotter",
				index: 0,
				data: "This is modified data",
			},
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);

		expect(response.status).toBe(400);
	});

	test("Authorized user is not able to edit a non existing entity", async () => {
		const response = await axios.put(
			`${BACKEND_URL}/api/v1/editor/edit/entity-at-index?id=${file._id}`,
			{
				index: 1000,
				data: "This is modified data",
			},
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);

		expect(response.status).toBe(400);
	});

	test("Authorized user is able to delete an entity", async () => {
		const response = await axios.delete(
			`${BACKEND_URL}/api/v1/editor/edit/entity-at-index?id=${file._id}`,
			{
				data: {
					index: 0,
				},
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);

		expect(response.status).toBe(200);
	});

	test("Authorized user is not able to edit a non existing entity", async () => {
		const response = await axios.delete(
			`${BACKEND_URL}/api/v1/editor/edit/entity-at-index?id=${file._id}`,
			{
				data: {
					index: 1000,
				},
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);

		expect(response.status).toBe(400);
	});

	test("Authorized user is able to delete a file", async () => {
		const response = await axios.delete(
			`${BACKEND_URL}/api/v1/editor/delete?id=${file._id}`,
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);

		expect(response.status).toBe(200);
	});

	test("Authorized user is not able to delete a non existant file file", async () => {
		const response = await axios.delete(
			`${BACKEND_URL}/api/v1/editor/delete?id=${file._id}`,
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);

		expect(response.status).toBe(400);
	});

	// test("Authorized user is able to edit all entities")
});
