import { User } from "../entities/user.entity";
import { Request, Response } from "express";
import { AssertsShape } from "yup/lib/object";
import { UserRepo } from "../repositories";
import { compare } from "bcrypt";
import { sign, decode } from "jsonwebtoken";
import { config } from "dotenv";
import ErrorHTTP from "../errors/ErrorHTTP";
import { serializedCreateUserSchema } from "../schemas/user/create.schema";
import {
  serializedAllUsers,
  serializedOneUser,
} from "../schemas/user/user.schema";

config();
interface ILogin {
  status: number;
  message: object | string;
}

interface ILoginData {
  email: string;
  password: string;
}

class UserService {
  createUser = async ({ validated }: Request): Promise<AssertsShape<any>> => {
    const userAlreadyExists = (await UserRepo.findOne({
      email: validated.email,
    })) as User | null;
    if (userAlreadyExists) {
      throw new ErrorHTTP(409, "Email already exists");
    }
    const user = await UserRepo.save(Object.assign(new User(), validated));
    const createdUser = await UserRepo.findOne({ id: user.id });
    return serializedCreateUserSchema.validate(createdUser, {
      stripUnknown: true,
    });
  };

  loginUser = async (userData: ILoginData): Promise<ILogin> => {
    const { email, password } = userData as ILoginData;

    const user = (await UserRepo.findOne({ email })) as User | null;

    if (!user) {
      throw new ErrorHTTP(404, "User not found");
    }

    const isValid = await compare(password, user?.password);

    if (!isValid) {
      throw new ErrorHTTP(401, "Email or password is incorrect");
    }

    const token = sign(
      { id: user.id, email: user.email, is_superuser: user.is_superuser },
      process.env.SECRET_KEY as string,
      {
        expiresIn: process.env.EXPIRES_IN as string,
      }
    );

    return {
      status: 200,
      message: {
        token,
      },
    };
  };

  getUser = async (req: Request) => {
    const token: string | any = req.headers.authorization?.split(" ")[1];

    const decoded: any = decode(token);

    if (!decoded.is_superuser) {
      const user = (await UserRepo.findOne({
        email: decoded.email,
      })) as User | null;

      return serializedOneUser.validate(user, { stripUnknown: true });
    } else {
      const users = (await UserRepo.all()) as User[];

      return serializedAllUsers.validate(users, { stripUnknown: true });
    }
  };

  getByid = async (req: Request) => {
    const { id } = req.params;

    const user = await UserRepo.findOne({ id: id });

    if (!user) {
      throw new ErrorHTTP(404, "User not found");
    }

    return serializedOneUser.validate(user, { stripUnknown: true });
  };

  update = async ({ validated, params, headers }: Request) => {
    const { id } = params;

    const user = await UserRepo.findOne({ id: id });

    const token: string | any = headers.authorization?.split(" ")[1];

    const decoded: any = decode(token);

    if (!user) {
      throw new ErrorHTTP(404, "User not found");
    }

    if (user.id != decoded.id && !decoded.is_superuser) {
      throw new ErrorHTTP(401, "Missing permissions");
    }

    await UserRepo.update(user.id, { ...(validated as User) });

    const updatedUser = await UserRepo.findOne({ id: id });

    return serializedOneUser.validate(updatedUser, {
      stripUnknown: true,
    });
  };

  delete = async ({ params }: Request) => {
    const { id } = params;

    const user = await UserRepo.findOne({ id: id });

    if (!user) {
      throw new ErrorHTTP(404, "User not found");
    }

    await UserRepo.delete(user.id);

    return "";
  };
}

export default new UserService();
