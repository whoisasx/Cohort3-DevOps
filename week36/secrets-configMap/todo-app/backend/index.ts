import express from "express";
import dotenv from "dotenv";

dotenv.config({
	path: "./secret/.env",
});

const app = express();

console.log(process.env.DATABASE_URL);
console.log(process.env.PORT);

app.get("/", (req, res) => {
	res.json({
		db: process.env.DATABASE_URL,
		port: process.env.PORT,
	});
});

app.listen(process.env.PORT, () => {
	console.log(`app is listening on port: ${process.env.PORT}`);
});
