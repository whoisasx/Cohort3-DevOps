import client from "prom-client";
import type { Request, Response, NextFunction } from "express";

export const requestCounter = new client.Counter({
	name: "total_http_requests",
	help: "total number of HTTP requests.",
	labelNames: ["method", "route", "status_code"],
});

// export async function requestCountMiddleware(
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) {
// 	const start = Date.now();
// 	res.on("finish", () => {
// 		const totalTime = Date.now() - start;
// 		// console.log(`time took was ${totalTime}ms.`);
// 		requestCounter.inc({
// 			method: req.method,
// 			route: req.originalUrl,
// 			status_code: res.statusCode,
// 		});
// 	});
// 	next();
// }
