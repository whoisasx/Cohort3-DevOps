import { Request, Response, NextFunction } from "express";
import { requestCounter } from "./requestCount";
import client from "prom-client";

export const activeRequestsGauge = new client.Gauge({
	name: "active_requests",
	help: "Number of active requests",
});

// export function cleanUpMiddleware(
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) {
// 	const start = Date.now();
// 	if (req.originalUrl !== "metrics") activeRequestsGauge.inc();

// 	res.on("finish", () => {
// 		const totalTime = Date.now() - start;

// 		requestCounter.inc({
// 			method: req.method,
// 			route: req.originalUrl,
// 			status_code: res.statusCode,
// 		});

// 		if (req.originalUrl !== "metrics") activeRequestsGauge.dec();
// 	});

// 	next();
// }
