import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Task } from "../entities/task.entity";

interface ITaskRepository {
  save: (task: Partial<Task>) => Promise<Task>;
  findOne: (payload: object) => Promise<Task | null>;
  find: (payload: object) => Promise<Task[] | null>;
  getAll: () => Promise<Task[]>;
  update: (id: string, payload: Partial<Task>) => Promise<UpdateResult>;
  delete: (id: string) => Promise<DeleteResult>;
}

class TaskRepo implements ITaskRepository {
  private ormRepo: Repository<Task>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Task);
  }

  save = async (task: Partial<any>) => {
    return await this.ormRepo.save(task);
  };

  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };

  find = async (payload: object) => {
    return await this.ormRepo.find({ where: { ...payload } });
  };

  getAll = async () => await this.ormRepo.find();

  update = async (id: string, payload: Partial<Task>) => {
    return await this.ormRepo.update(id, { ...payload });
  };

  delete = async (id: string) => {
    return await this.ormRepo.delete(id);
  };
}

export default new TaskRepo();
