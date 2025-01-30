// hooks/useSocket.ts
import { useEffect, useState } from "react";
import SocketService from "./socket";

export const useSocket = (token: string) => {
	const [socket] = useState(() => SocketService.getInstance(token));
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (token) {
			socket.auth = { token }; // Ensure token updates dynamically
		}
		socket.connect();

		// Handle connection errors
		const handleError = (err: Error) => {
			console.error("Socket Error:", err.message);
			setError(err.message);
		};

		socket.on("connect_error", handleError);

		return () => {
			socket.off("connect_error", handleError);
			socket.disconnect();
		};
	}, [socket, token]);

	return { socket, error };
};
