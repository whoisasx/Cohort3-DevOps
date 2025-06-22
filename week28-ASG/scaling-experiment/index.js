const express = require("express");
const cluster = require("cluster");
const os = require("os");

const CPU_COUNTS = os.cpus().length;
console.log(CPU_COUNTS);

const PORT = 3000;

if (cluster.isPrimary) {
	console.log(`number of cpu are: ${CPU_COUNTS}`);
	console.log(`primary ${process.pid} is running.`);

	for (let i = 0; i < CPU_COUNTS; i++) {
		cluster.fork();
	}

	cluster.on("exit", (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died.`);
		console.log("lets fork another one.");
		cluster.fork();
	});
} else {
	const app = express();
	app.use(express.json());

	console.log(`worker ${process.pid} started.`);

	app.get("/", (req, res) => {
		res.send("Hello World!");
	});

	app.get("/pid", (req, res) => {
		res.send(`process id: ${process.pid}`);
	});

	app.get("/api/:n", function (req, res) {
		let n = parseInt(req.params.n);
		let count = 0;

		if (n > 5000000000) n = 5000000000;

		for (let i = 0; i <= n; i++) {
			count += i;
		}

		res.send(`Final count is ${count} ${process.pid}`);
	});

	app.listen(PORT, () => {
		console.log(`App listening on port ${PORT}`);
	});
}
