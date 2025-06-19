import { prisma } from "@repo/db/prisma";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 }, () => {
	console.log("ws-server is listening on port:8080");
});

wss.on("connection", async (socket) => {
	await prisma.user.create({
		data: {
			email: Math.random().toString(),
			password: Math.random().toString(),
		},
	});

	socket.send("hi there, connected to database.");
});
