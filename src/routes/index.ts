import { Express } from "express";
import userRouter from "./user.routes";
import taskRouter from "./task.routes";

const registerRouters = (app: Express): void => {
  app.use("/api", userRouter);
  app.use("/api", taskRouter);
};

export default registerRouters;
