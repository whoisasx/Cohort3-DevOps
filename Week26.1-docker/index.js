const express = require("express");

const app = express();

app.get("/", (req, res) => {
	res.send("hello ji.");
});

app.listen(3000, () => {
	console.log("app is listening on port: 3000");
});
