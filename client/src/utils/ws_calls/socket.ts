// copied from chatgpt
import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_WS_URL;

class SocketService {
	private static instance: Socket;

	static getInstance(token: string) {
		if (!SocketService.instance) {
			// if no instance exists
			SocketService.instance = io(SOCKET_URL, {
				autoConnect: false,
				reconnection: true,
				reconnectionAttempts: 5, // Retry 5 times before failing
				transports: ["websocket"],
				auth: {
					token, // Send token on connection
				},
			});

			// Handle connection errors
			SocketService.instance.on("connect_error", (error) => {
				console.error("Socket connection error:", error.message);
			});

			SocketService.instance.on("disconnect", (reason) => {
				console.warn(`Socket disconnected: ${reason}`);
			});
		} else {
			// Update the token if instance already exists
			SocketService.instance.auth = { token };
		}

		return SocketService.instance;
	}
}

export default SocketService;
