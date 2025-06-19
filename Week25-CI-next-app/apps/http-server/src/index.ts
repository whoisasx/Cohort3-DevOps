import { prisma } from "@repo/db/prisma";
import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	res.send("hi there");
});

app.post("/signup", async (req, res) => {
	const { email, password }: { email: string; password: string } = req.body;

	const user = await prisma.user.create({
		data: {
			email,
			password,
		},
	});

	res.json({
		message: "signed up.",
		id: user.id,
	});
});

app.listen(3001, () => {
	console.log("http-server is listening on port: 3001");
});
