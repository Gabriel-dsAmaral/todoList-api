import { User, Task } from "../entities";
export type TDecoded = { email: string; is_superuser: boolean };

declare global {
  namespace Express {
    interface Request {
      validated: User & Task;
      decoded: TDecoded;
      user: User;
      task: Task;
      findRepository: object;
    }
  }
}
