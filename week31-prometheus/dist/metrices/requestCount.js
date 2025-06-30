"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestCounter = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
exports.requestCounter = new prom_client_1.default.Counter({
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
