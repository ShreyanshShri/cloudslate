const leaveHandler = (socket: AuthenticatedSocket) => {
	socket.on("leave-room", (room) => {
		socket.leave(room);
		socket.to(room).emit("user-left", `${socket.id} has left the room.`);
		console.log(`${socket.id} left room: ${room}`);
	});
};

export default leaveHandler;
