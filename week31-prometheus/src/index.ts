import express, { Request, Response } from "express";
import { middleware } from "./middleware";
import { metricsMiddleware } from "./metrices/index";
import client from "prom-client";

const app = express();

app.use(metricsMiddleware);
app.use(express.json());

app.get("/user", async (req: Request, res: Response) => {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	res.send({
		name: "adil",
		age: 21,
	});
});

app.post("/user", (req: Request, res: Response) => {
	const user = req.body;
	res.send({
		...user,
		id: 1,
	});
});

app.get("/cpu", async (req, res) => {
	await new Promise((resolve) => setTimeout(resolve, 5000));
	for (let i = 0; i < 10000000; i++) {}
	res.json({
		message: "cpu",
	});
});

app.get("/metrics", async (req, res) => {
	const metrics = await client.register.metrics();
	// console.log(metrics);
	res.set("Content-Type", client.register.contentType);
	res.end(metrics);
});

app.listen(3000, () => {
	console.log("app is listening on port 3000");
});
