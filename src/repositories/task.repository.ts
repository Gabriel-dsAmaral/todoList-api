import { Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Task } from "../entities/task.entity";

interface ITaskRepository {
  save: (task: Partial<Task>) => Promise<Task>;
  findOne: (payload: object) => Promise<Task | null>;
  getAll: () => Promise<Task[]>;
  update: (id: string, payload: Partial<Task>) => Promise<UpdateResult>;
}

class TaskRepo implements ITaskRepository {
  private ormRepo: Repository<Task>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Task);
  }

  save = async (task: Partial<Task>) => {
    return await this.ormRepo.save(task);
  };

  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };

  getAll = async () => await this.ormRepo.find();

  update = async (id: string, payload: Partial<Task>) => {
    return await this.ormRepo.update(id, { ...payload });
  };
}

export default new TaskRepo();
