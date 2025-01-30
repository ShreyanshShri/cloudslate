import joinHandler from "./common/join";
import messageHandler from "./chats/message";
import leaveHandler from "./common/leave";

const registerEvents = (socket) => {
	joinHandler(socket);
	messageHandler(socket);
	leaveHandler(socket);
};

export default registerEvents;
