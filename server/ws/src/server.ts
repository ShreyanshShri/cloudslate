import express from "express";
import http from "http";
import initSocketServer from "./socketServer";
require("dotenv").config();

const app = express();
const httpServer = http.createServer(app);

// Middleware
app.use(express.json());

// Sample API
app.get("/health", (req, res) => {
	res.status(200).json({ message: "server is healthy" });
});

// Initialize Socket.IO
initSocketServer(httpServer);

// Start the server
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
