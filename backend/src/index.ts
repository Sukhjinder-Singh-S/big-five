import * as dotenv from 'dotenv';
import * as http from "http";
import { createApp, createServer } from "./App";
import connectDB from "./db/dbConnection";
import { AddressInfo } from "net";
import logger from "./lib/logger";

// Start the server and connect to MongoDB database
const startServer = async (): Promise<void> => {
  try {
    const app = createApp();
    const server = createServer(app);
    dotenv.config();

    const port = process.env.PORT || 8080;
    app.set("port", port);

    server.on("error", handleServerError);
    server.on("listening", () => handleServerListening(server));

    // Starting the server here
    server.listen(port, () => {
      logger.info(`Server is starting on port ${port}`);
    });

    // Connect to MongoDB database
    await connectDB();
  } catch (err) {
    logger.info("Error during initialization");
  }
};

// Error handling functions for server
const handleServerError = (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== "listen") {
    throw error;
  }
  throw error;
};

// Logging server listening event
const handleServerListening = (server: http.Server): void => {
  const addressInfo: AddressInfo = server.address() as AddressInfo;
  logger.info(`Listening on ${addressInfo.address}:${addressInfo.port}`);
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason: Error) => {
  logger.error("Unhandled Promise Rejection:", reason.message);
  logger.error(reason.stack);// throw any other error if required
  process.exit(1);
});

// Start the server
startServer();
