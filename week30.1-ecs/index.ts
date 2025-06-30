import express from "express";

const app = express();
app.use(express.json());

app.get("/cpu", (req, res) => {
	for (let i = 0; i < 100000000; i++) {
		Math.random();
	}

	res.send("hello world");
});

app.get("/", (req, res) => {
	// health check.
	res.send("hi.");
});

app.listen(3000, () => {
	console.log("app is listening on the port: 3000");
});
