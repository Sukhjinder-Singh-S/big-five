import express from "express";
import http from "http";
import cors from "cors";
import userRouter from './route/userRoute'

/**
 * Creating an express server startup
 */
const createApp = (): express.Application => {
  const app = express();
  app.use(express.json({ limit: "100mb" }));
  app.use(express.urlencoded({ limit: "100mb", extended: true }));

  // Set cors options as per use
  // const corsOptions = {
  //   origin: [
  //     "http://localhost:8080/",
  //     "http://example.com/",
  //     "http://127.0.0.1:8080",
  //   ],
  // };
  app.use(cors());

  //Attach the routes below this one
  app.use("/api", userRouter)
  app.use("/", basePathRoute)


  return app;
};

/**
 *To handle to base path
 */
const basePathRoute = (req: express.Request, res: express.Response): void => {
  res.json({ message: "Application base path '/' " });
};

const parseRequestHeader = (req: express.Request, res: express.Response, next: Function,): void => {
  console.log(`Request headers: ${JSON.stringify(req.headers)}`);
  next();
}

const createServer = (app: express.Application): http.Server => {
  return http.createServer(app);
};

export { createApp, createServer }