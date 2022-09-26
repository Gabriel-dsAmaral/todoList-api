import * as yup from "yup";
import { hashSync } from "bcrypt";

const createUserSchema = yup.object().shape({
  user_name: yup.string().required(),
  email: yup.string().email().lowercase().required(),
  password: yup
    .string()
    .transform((pwd: string) => hashSync(pwd, 8))
    .required(),
});

const loginUserSchema = yup.object().shape({
  email: yup.string().email().lowercase().required(),
  password: yup.string().required(),
});

const responseObject = {
  id: yup.string().uuid().required(),
  user_name: yup.string().required(),
  email: yup.string().email().lowercase().required(),
};

const newShape = Object.entries(responseObject)
  .reverse()
  .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});

const serializedCreateUserSchema = yup.object().shape(newShape);

export { createUserSchema, serializedCreateUserSchema, loginUserSchema };
