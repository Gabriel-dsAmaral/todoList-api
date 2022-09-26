import * as yup from "yup";

const createTaskSchema = yup.object().shape({
  description: yup.string().required(),
});

const responseObject = {
  id: yup.string().uuid().required(),
  description: yup.string().required(),
  is_complete: yup.boolean().required(),
};

const newShape = Object.entries(responseObject)
  .reverse()
  .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});

const serializedCreateTaskSchema = yup.object().shape(newShape);

const serializedArrEventsSchema = yup.array().of(yup.object().shape(newShape));

export {
  createTaskSchema,
  serializedCreateTaskSchema,
  serializedArrEventsSchema,
};
