import configureSocketServer from "./config/socket";
import socketRoutes from "./routes/socketRoutes";

function initSocketServer(httpServer) {
	const io = configureSocketServer(httpServer);
	socketRoutes(io);
}

export default initSocketServer;
