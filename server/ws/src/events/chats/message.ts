import moment from "moment";

type messageHandlerType = {
	room: string;
	data: {
		message: string;
	};
};

const messageHandler = (socket: AuthenticatedSocket) => {
	socket.on("message", ({ room, data }: messageHandlerType) => {
		const { message } = data;
		socket
			.to(room)
			.emit("message", {
				message,
				sender: socket.user_id,
				time: moment().format("HH:mm"),
			}); // for testing
		console.log(`Message from ${socket.user_id} in room ${room}: ${message}`);
	});
};

export default messageHandler;
