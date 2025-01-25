const axios = require("../my_axios");

const BACKEND_URL = require("../backend_url");

const unauthorized_token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODllNmRmMTEwNTcxMGE5MjQ5OTIzZCIsImlhdCI6MTczNzExNTA1NX0.RjMn0SPyAmnQeVXz6h3y-JFqlRtptIOlFEc86nZ7-74";

describe("Editor", () => {
	let token;
	let admin_id;
	let contributor_token;
	let contributor_id;
	let file;

	beforeAll(async () => {
		const username1 = `shreyansh-${Math.random()}`;
		const email1 = `shreyansh-${Math.random()}@gmail.com`;
		const username2 = `shreyansh-${Math.random()}`;
		const email2 = `shreyansh-${Math.random()}@gmail.com`;
		const password = "test-pass";

		await axios.post(`${BACKEND_URL}/api/v1/auth/register`, {
			username: username1,
			password,
			email: email1,
		});
		await axios.post(`${BACKEND_URL}/api/v1/auth/register`, {
			username: username2,
			password,
			email: email2,
		});

		const response1 = await axios.post(`${BACKEND_URL}/api/v1/auth/login`, {
			email: email1,
			password,
		});
		const response2 = await axios.post(`${BACKEND_URL}/api/v1/auth/login`, {
			email: email2,
			password,
		});

		token = response1.data.token;
		admin_id = response1.data.user_id;
		contributor_token = response2.data.token;
		contributor_id = response2.data.user_id;

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

	// test("Authorized user is able to edit all entities")
	test("Admin is able to add a contributor", async () => {
		const response = await axios.put(
			`${BACKEND_URL}/api/v1/editor/edit/add-contributor?id=${file._id}`,
			{
				id: contributor_id,
			},
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);

		expect(response.status).toBe(200);
	});

	test("Admin is not able to re-add an already existing contributor", async () => {
		const response = await axios.put(
			`${BACKEND_URL}/api/v1/editor/edit/add-contributor?id=${file._id}`,
			{
				id: contributor_id,
			},
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);

		expect(response.status).toBe(400);
	});

	test("Contributor is able to see pvt files", async () => {
		await axios.put(
			`${BACKEND_URL}/api/v1/editor/edit/set-visibility?id=${file._id}`,
			{
				isPublic: false,
			},
			{
				headers: {
					authorization: `Bearer ${contributor_token}`,
				},
			}
		);

		const response = await axios.get(
			`${BACKEND_URL}/api/v1/editor/get?id=${file._id}`,
			{
				headers: {
					authorization: `Bearer ${contributor_token}`,
				},
			}
		);

		expect(response.status).toBe(200);
		expect(response.data.file).toBeDefined();
	});

	test("Contributor is able to modify pvt files", async () => {
		const response = await axios.put(
			`${BACKEND_URL}/api/v1/editor/edit/push?id=${file._id}`,
			{
				type: "textarea",
				data: "This is textarea data",
			},
			{
				headers: {
					authorization: `Bearer ${contributor_token}`,
				},
			}
		);

		expect(response.status).toBe(200);
		expect(response.data.entity).toBeDefined();
	});

	test("Admin is able to remove a contributor", async () => {
		const response = await axios.put(
			`${BACKEND_URL}/api/v1/editor/edit/remove-contributor?id=${file._id}`,
			{
				id: contributor_id,
			},
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);

		expect(response.status).toBe(200);
	});

	test("Admin is not able to remove a non contributor", async () => {
		const response1 = await axios.put(
			`${BACKEND_URL}/api/v1/editor/edit/remove-contributor?id=${file._id}`,
			{
				id: contributor_id,
			},
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);

		const response2 = await axios.put(
			`${BACKEND_URL}/api/v1/editor/edit/remove-contributor?id=${file._id}`,
			{
				id: "gibbrish",
			},
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);

		expect(response1.status).toBe(200);
		expect(response2.status).toBe(400);
	});

	test("Contributor is no longer able to modify pvt files", async () => {
		const response = await axios.put(
			`${BACKEND_URL}/api/v1/editor/edit/push?id=${file._id}`,
			{
				type: "textarea",
				data: "This is textarea data",
			},
			{
				headers: {
					authorization: `Bearer ${contributor_token}`,
				},
			}
		);

		expect(response.status).toBe(400);
	});

	// test("Authorized user is able to delete a file", async () => {
	// 	const response = await axios.delete(
	// 		`${BACKEND_URL}/api/v1/editor/delete?id=${file._id}`,
	// 		{
	// 			headers: {
	// 				authorization: `Bearer ${token}`,
	// 			},
	// 		}
	// 	);

	// 	expect(response.status).toBe(200);
	// });

	// test("Authorized user is not able to delete a non existent file file", async () => {
	// 	const response = await axios.delete(
	// 		`${BACKEND_URL}/api/v1/editor/delete?id=${file._id}`,
	// 		{
	// 			headers: {
	// 				authorization: `Bearer ${token}`,
	// 			},
	// 		}
	// 	);

	// 	expect(response.status).toBe(400);
	// });
});
