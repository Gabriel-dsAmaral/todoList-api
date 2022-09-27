import { NextFunction, Request, Response } from "express";
import ErrorHTTP from "../errors/ErrorHTTP";
import { decode } from "jsonwebtoken";
import { TaskRepo, UserRepo } from "../repositories";

const getTaskByIdOr404 = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    let { id } = req.params;

    const foundTask = await TaskRepo.findOne({ id: id });

    if (!foundTask) {
      throw new ErrorHTTP(404, `Task with id ${req.params.id} not found.`);
    }

    const token: string | any = req.headers.authorization?.split(" ")[1];

    const decoded: any = decode(token);

    const user = await UserRepo.findOne({ id: decoded.id });

    let valid = false;

    user.tasks.forEach((task) => {
      if (task.id == foundTask.id) {
        valid = true;
      }
    });

    if (valid == false) {
      throw new Error();
    }

    req.task = foundTask;

    next();
  } catch (err: any) {
    if (err instanceof Error) {
      throw new ErrorHTTP(401, "You don't own this task");
    }
    throw new ErrorHTTP(404, `The id ${req.params.id} is not valid`);
  }
};

export default getTaskByIdOr404;
