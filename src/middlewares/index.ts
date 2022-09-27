import errorHandling from "./errorHandling.middleware";
import validadeSchema from "./validateSchema.middleware";
import validateToken from "./validatetoken.middleware";
import verifyAdmin from "./verifyAdmin.middleware";
import getTaskByIdOr404 from "./getTaskByIdOr404.middleware";

export {
  validadeSchema,
  errorHandling,
  validateToken,
  verifyAdmin,
  getTaskByIdOr404,
};
