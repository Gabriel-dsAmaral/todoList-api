import * as yup from "yup";
import { serializedArrEventsSchema } from "../task/create.schema";

const responseObject = {
  id: yup.string().uuid().required(),
  user_name: yup.string().required(),
  email: yup.string().email().lowercase().required(),
  tasks: serializedArrEventsSchema,
};

const newShape = Object.entries(responseObject)
  .reverse()
  .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});

const serializedOneUser = yup.object().shape(newShape);

const serializedAllUsers = yup.array().of(yup.object().shape(newShape));

const userUpdateSchema = yup.object().shape({
  user_name: yup.string().optional(),
  email: yup.string().optional(),
});

export { serializedOneUser, serializedAllUsers, userUpdateSchema };
