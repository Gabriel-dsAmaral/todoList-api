import { Request, Response } from "express";
import TaskService from "../services/task.service";

class TaskController {
  createTask = async (req: Request, res: Response) => {
    return res.status(201).json(await TaskService.createTask(req));
  };

  getAll = async (req: Request, res: Response) => {
    return res.status(200).json(await TaskService.getAll(req));
  };

  getById = async (req: Request, res: Response) => {
    return res.status(200).json(await TaskService.getByid(req));
  };

  update = async (req: Request, res: Response) => {
    return res.status(200).json(await TaskService.update(req));
  };

  complete = async (req: Request, res: Response) => {
    return res.status(200).json(await TaskService.complete(req));
  };

  delete = async (req: Request, res: Response) => {
    return res.status(204).json(await TaskService.delete(req));
  };
}

export default new TaskController();
