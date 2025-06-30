import client from "prom-client";

export const httpRequestDurationMS = new client.Histogram({
	name: "http_request_duration_ms",
	help: "Duration of HTTP request in MS",
	labelNames: ["method", "route", "status_code"],
	buckets: [0.1, 5, 15, 100, 300, 500, 1000, 3000, 5000],
});
