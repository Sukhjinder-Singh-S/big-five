"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const userRoute_1 = __importDefault(require("./route/userRoute"));
/**
 * Creating an express server startup
 */
const createApp = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json({ limit: "100mb" }));
    app.use(express_1.default.urlencoded({ limit: "100mb", extended: true }));
    // Set cors options as per use
    const corsOptions = {
        origin: [
            "http://localhost:8080/",
            "http://example.com/",
            "http://127.0.0.1:8080",
        ],
    };
    app.use((0, cors_1.default)(corsOptions));
    //Attach the routes below this one
    app.use("/", basePathRoute);
    app.use(userRoute_1.default);
    return app;
};
exports.createApp = createApp;
/**
 *To handle to base path
 */
const basePathRoute = (req, res) => {
    res.json({ message: "Application base path '/' " });
};
const parseRequestHeader = (req, res, next) => {
    console.log(`Request headers: ${JSON.stringify(req.headers)}`);
    next();
};
const createServer = (app) => {
    return http_1.default.createServer(app);
};
exports.createServer = createServer;
