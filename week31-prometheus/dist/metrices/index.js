"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsMiddleware = void 0;
const activeRequests_1 = require("./activeRequests");
const requestCount_1 = require("./requestCount");
const requestTime_1 = require("./requestTime");
const metricsMiddleware = (req, res, next) => {
    const start = Date.now();
    if (req.originalUrl !== "/metrics")
        activeRequests_1.activeRequestsGauge.inc();
    res.on("finish", () => {
        const totalTime = Date.now() - start;
        requestCount_1.requestCounter.inc({
            method: req.method,
            route: req.originalUrl,
            status_code: res.statusCode,
        });
        requestTime_1.httpRequestDurationMS.observe({
            method: req.method,
            route: req.originalUrl,
            status_code: res.statusCode,
        }, totalTime);
        if (req.originalUrl !== "/metrics")
            activeRequests_1.activeRequestsGauge.dec();
    });
    next();
};
exports.metricsMiddleware = metricsMiddleware;
