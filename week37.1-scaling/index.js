import express from "express";

const app = express();
app.use(express.json());

const BIG_VALUE = BigInt(10000000000);

app.get("/", (req, res) => {
	let ctr = BigInt(0);
	for (let i = BigInt(0); i < BIG_VALUE; i++) {
		ctr += i;
	}

	res.send("hello world");
});

app.listen(3000, () => {
	console.log("app is listening on port: 3000");
});
