import { Task } from "../entities/task.entity";
import { Request, Response } from "express";
import { AssertsShape } from "yup/lib/object";
import { TaskRepo, UserRepo } from "../repositories";
import { decode } from "jsonwebtoken";
import { config } from "dotenv";
import ErrorHTTP from "../errors/ErrorHTTP";
import {
  serializedCreateTaskSchema,
  serializedArrTasksSchema,
} from "../schemas/task/create.schema";

config();

class TaskService {
  createTask = async ({
    validated,
    headers,
  }: Request): Promise<AssertsShape<any>> => {
    const token: string | any = headers.authorization?.split(" ")[1];

    const decoded: any = decode(token);

    const user = await UserRepo.findOne({ id: decoded.id });

    validated.user = user;

    const task = await TaskRepo.save(validated);

    return serializedCreateTaskSchema.validate(task, {
      stripUnknown: true,
    });
  };

  getAll = async (req: Request) => {
    const token: string | any = req.headers.authorization?.split(" ")[1];

    const decoded: any = decode(token);

    const user = await UserRepo.findOne({ id: decoded.id });

    return serializedArrTasksSchema.validate(user.tasks, {
      stripUnknown: true,
    });
  };

  getByid = async ({ task }: Request) => {
    return serializedCreateTaskSchema.validate(task, {
      stripUnknown: true,
    });
  };

  update = async ({ validated, task }: Request) => {
    await TaskRepo.update(task.id, { ...validated });

    const updatedTask = await TaskRepo.findOne({ id: task.id });

    return serializedCreateTaskSchema.validate(updatedTask, {
      stripUnknown: true,
    });
  };

  complete = async ({ task }: Request) => {
    await TaskRepo.update(task.id, { is_complete: true });

    const updatedTask = await TaskRepo.findOne({ id: task.id });

    return serializedCreateTaskSchema.validate(updatedTask, {
      stripUnknown: true,
    });
  };

  delete = async ({ task }: Request) => {
    await TaskRepo.delete(task.id);

    return "";
  };
}

export default new TaskService();
