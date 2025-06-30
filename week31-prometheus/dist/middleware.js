"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = middleware;
function middleware(req, res, next) {
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
