import "express-async-errors";
import { Router } from "express";
import TaskController from "../controllers/task.controller";

import {
  validadeSchema,
  validateToken,
  verifyAdmin,
  getTaskByIdOr404,
} from "../middlewares";
import { createTaskSchema } from "../schemas/task/create.schema";

const taskRouter = Router();

taskRouter.post(
  "/tasks",
  validateToken,
  validadeSchema(createTaskSchema),
  TaskController.createTask
);

taskRouter.get("/tasks", validateToken, TaskController.getAll);

taskRouter.get(
  "/tasks/:id",
  validateToken,
  getTaskByIdOr404,
  TaskController.getById
);

taskRouter.patch(
  "/tasks/:id",
  validadeSchema(createTaskSchema),
  validateToken,
  getTaskByIdOr404,
  TaskController.update
);

taskRouter.patch(
  "/tasks/:id/complete",
  validateToken,
  getTaskByIdOr404,
  TaskController.complete
);

taskRouter.delete(
  "/tasks/:id",
  validateToken,
  getTaskByIdOr404,
  TaskController.delete
);

export default taskRouter;
