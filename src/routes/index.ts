import { Express } from "express";
import userRouter from "./user.routes";

const registerRouters = (app: Express): void => {
  app.use("/api", userRouter);
};

export default registerRouters;
