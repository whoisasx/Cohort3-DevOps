import { NextFunction, Request, Response } from "express";

export function middleware(req: Request, res: Response, next: NextFunction) {
	const start = Date.now();

	// res.on("finish", () => {
	// 	const totalTime = Date.now() - start;
	// 	console.log(
	// 		`request took ${totalTime}ms on endpoint ${req.originalUrl} for method ${req.method}`
	// 	);
	// });

	next();
	// const totalTime = Date.now() - start;
	// console.log(
	// 	`request took ${totalTime}ms on endpoint ${req.originalUrl} for method ${req.method} with the status code ${res.statusCode}`
	// );
}
