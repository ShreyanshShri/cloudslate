import axios from "axios";

type joinHandlerTypes = {
	file_id: string;
};

const joinHandler = (socket: AuthenticatedSocket) => {
	socket.on("join-room", async ({ file_id }: joinHandlerTypes) => {
		const res = await verifyReadAccess(file_id, socket.token as string);
		if (!res) return;
		socket.join(file_id);
		socket.to(file_id).emit("user-joined", `${socket.id} has joined the room.`);
		console.log(`${socket.id} joined room: ${file_id}`);
	});
};

const verifyReadAccess = async (
	file_id: string,
	token: string
): Promise<boolean> => {
	try {
		await axios.get(
			`${process.env.HTTP_URL}/editor/verify-read-access?id=${file_id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return true;
	} catch (err: any) {
		console.error(err.response.data.message);
		return false;
	}
};

export default joinHandler;
