import registerEvents from "../events";

const socketRoutes = (io) => {
	io.on("connection", (socket) => {
		console.log(`User connected: ${socket.id}`);
		registerEvents(socket);

		socket.on("disconnect", () => {
			console.log(`User disconnected: ${socket.id}`);
		});
	});
};

export default socketRoutes;
