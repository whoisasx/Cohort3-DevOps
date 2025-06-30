import { Request, Response, NextFunction } from "express";
import { activeRequestsGauge } from "./activeRequests";
import { requestCounter } from "./requestCount";
import { httpRequestDurationMS } from "./requestTime";

export const metricsMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const start = Date.now();
	if (req.originalUrl !== "/metrics") activeRequestsGauge.inc();

	res.on("finish", () => {
		const totalTime = Date.now() - start;

		requestCounter.inc({
			method: req.method,
			route: req.originalUrl,
			status_code: res.statusCode,
		});

		httpRequestDurationMS.observe(
			{
				method: req.method,
				route: req.originalUrl,
				status_code: res.statusCode,
			},
			totalTime
		);

		if (req.originalUrl !== "/metrics") activeRequestsGauge.dec();
	});

	next();
};
