const cluster = require("cluster");
const os = require("os");

const CPU_COUNT = os.cpus().length;

function findSum(num) {
	if (cluster.isPrimary) {
		console.log(`number of CPU: ${CPU_COUNT}`);
		console.log(`primary process ${process.pid} started.`);

		let dx = Math.floor(num / CPU_COUNT);
		let a = 1;
		let b = dx;
		let worker = [];
		for (let i = 0; i < CPU_COUNT; i++) {
			worker[i] = cluster.fork();
			worker[i].send({
				type: "find sum",
				data: {
					a,
					b,
				},
			});

			a = b;
			b = b + dx;
		}

		for (let i = 0; i < CPU_COUNT; i++) {
			worker[i].on("message", (msg) => {
				console.log("msg");
			});
		}
	} else {
		let sum = 0;
		process.on("message", (msg) => {
			if (msg) {
				let a = Number(msg.data.a);
				let b = Number(msg.data.b);
				for (let i = a; i <= b; i++) sum += i;
				console.log(sum);
				console.log(`/`);
			}
		});

		if (sum > 0) {
			process.send({
				type: "sum",
				data: {
					sum,
				},
			});
		}
		return;
	}
}

module.exports.findSum = findSum;
