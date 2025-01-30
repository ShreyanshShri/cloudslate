const io = require("socket.io-client");

const socket = io("http://localhost:3001", {
	auth: { token: "your-jwt-token" },
});

socket.emit("join", "room1");

socket.on("user-joined", (msg) => console.log(msg));

socket.emit("message", { room: "room1", message: "Hello everyone!" });

socket.on("message", (data) => console.log(`${data.user}: ${data.message}`));

socket.emit("leave", "room1");

socket.on("user-left", (msg) => console.log(msg));
