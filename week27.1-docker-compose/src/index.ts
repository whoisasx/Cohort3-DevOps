import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const prismaClient = new PrismaClient();

app.get("/", async (req, res) => {
	const data = await prismaClient.user.findMany();

	res.json({
		message: "get end point",
		data,
	});
});

app.post("/", async (req, res) => {
	await prismaClient.user.create({
		data: {
			username: req.body.username,
			password: req.body.password,
		},
	});
	res.json({
		message: "post end point",
	});
});

app.listen(3000, () => {
	console.log("app is listening on port: 3000");
});
