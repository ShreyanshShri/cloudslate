import { Server, Socket } from "socket.io";
import axios from "axios";

// declaring authenticated socket interface
declare global {
	interface AuthenticatedSocket extends Socket {
		token?: string;
		user_id?: string;
	}
}

function configureSocketServer(httpServer) {
	const io = new Server(httpServer, {
		cors: {
			origin: "*", // Replace with your frontend URL for production
			methods: ["GET", "POST"],
		},
	});

	io.use(async (socket: AuthenticatedSocket, next) => {
		const token = socket.handshake.auth.token;
		if (!token) return next(new Error("No auth token found."));
		// Validate token
		const res = await validateToken(token);
		if (res.status) {
			socket.token = token;
			socket.user_id = res.user_id;
			next();
		} else {
			return next(new Error("Invalid authentication token."));
		}
	});

	/*
		If the next method is called with an Error object, the connection will be refused and the client will receive an connect_error event.

		// client-side
		socket.on("connect_error", (err) => {
		console.log(err.message); // prints the message associated with the error
		});
	*/

	return io;
}

type returnTypes = {
	status: boolean;
	user_id?: string;
};
const validateToken = async (token: string): Promise<returnTypes> => {
	try {
		const response = await axios.get(`${process.env.HTTP_URL}/auth/verify`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.data.user_id != undefined) {
			return {
				status: true,
				user_id: response.data.user_id,
			};
		}
	} catch (err: any) {
		console.error(err.response.data.message);
		return {
			status: false,
		};
	}
	return { status: false };
};

export default configureSocketServer;
