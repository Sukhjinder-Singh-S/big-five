"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const dbConnection_1 = __importDefault(require("./db/dbConnection"));
const logger_1 = __importDefault(require("./lib/logger"));
// Start the server and connect to MongoDB database
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const app = (0, App_1.createApp)();
        const server = (0, App_1.createServer)(app);
        const port = process.env.PORT || 8080;
        app.set("port", port);
        server.on("error", handleServerError);
        server.on("listening", () => handleServerListening(server));
        // Starting the server here
        server.listen(port, () => {
            logger_1.default.info(`Server is starting on port ${port}`);
        });
        // Connect to MongoDB database
        yield (0, dbConnection_1.default)();
    }
    catch (err) {
        logger_1.default.info("Error during initialization");
    }
});
// Error handling functions for server
const handleServerError = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    throw error;
};
// Logging server listening event
const handleServerListening = (server) => {
    const addressInfo = server.address();
    logger_1.default.info(`Listening on ${addressInfo.address}:${addressInfo.port}`);
};
// Handle unhandled promise rejections
process.on("unhandledRejection", (reason) => {
    logger_1.default.error("Unhandled Promise Rejection:", reason.message);
    logger_1.default.error(reason.stack); // throw any other error if required
    process.exit(1);
});
// Start the server
startServer();
