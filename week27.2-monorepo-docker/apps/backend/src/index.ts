import { prisma } from "@repo/db/prisma";
import express from "express";

const app = express();

app.get("/", async (req, res) => {
	prisma.user
		.findMany()
		.then((users) => {
			res.json(users);
		})
		.catch((err) => {
			res.status(500).json({
				message: err.message,
			});
		});
});

app.post("/", async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		res.status(400).json({
			message: "username and password are required.",
		});
	}

	prisma.user
		.create({
			data: {
				username,
				password,
			},
		})
		.then((user) => {
			res.status(201).json(user);
		})
		.catch((err) => {
			res.status(500).json({
				message: err.message,
			});
		});
});

app.listen(8080, () => {
	console.log("http is listening on port:8080");
});
