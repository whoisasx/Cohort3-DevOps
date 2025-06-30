"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpRequestDurationMS = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
exports.httpRequestDurationMS = new prom_client_1.default.Histogram({
    name: "http_request_duration_ms",
    help: "Duration of HTTP request in MS",
    labelNames: ["method", "route", "status_code"],
    buckets: [0.1, 5, 15, 100, 300, 500, 1000, 3000, 5000],
});
