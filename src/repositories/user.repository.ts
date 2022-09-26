import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

interface IUserRepository {
  save: (user: User) => Promise<User>;
  findOne: (payload: object) => Promise<User | null>;
  all: () => Promise<User[]>;
  update: (id: string, payload: Partial<User>) => Promise<UpdateResult>;
  delete: (id: string) => Promise<DeleteResult>;
}

class UserRepo implements IUserRepository {
  private ormRepo: Repository<User>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(User);
  }

  save = async (user: Partial<User>) => await this.ormRepo.save(user);

  all = async () => await this.ormRepo.find();

  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };

  update = async (id: string, payload: Partial<User>) =>
    await this.ormRepo.update(id, { ...payload });

  delete = async (id: string) => {
    return await this.ormRepo.delete(id);
  };
}

export default new UserRepo();
