import { prisma } from "@repo/db/prisma";

Bun.serve({
	port: 8081,
	fetch(req, server) {
		if (server.upgrade(req)) {
			return;
		}
		return new Response("upgrade failed", { status: 500 });
	},
	websocket: {
		async message(ws, message) {
			await prisma.user.create({
				data: {
					username: Math.random().toString(),
					password: Math.random().toString(),
				},
			});
			ws.send(message);
		},
	},
});
